import Person_likes_Post from '../models/Person_Likes_Post.js';
import neo4jDriver from '../../config/connectNeo4j.js';  

let driver;

neo4jDriver()
  .then(d => driver = d)
  .catch(err => {
    console.error('Failed to connect to Neo4j on startup:', err);
    process.exit(1);
  });

// Controller function to get all persons who work/study at a specific organization (company or university),
// and who liked more than a certain number of posts
export const getPersonsByOrganizationAndLikes = async (req, res) => {
    const { org, minLikes } = req.params;
    const likesCount = parseInt(minLikes, 10);

    const session = driver.session();
    try {

        // First, fetch the organization type
        const orgTypeResult = await session.run(
            `MATCH (org:Organisation {name: $org}) RETURN org.type AS orgType LIMIT 1`,
            { org }
        );
        if (orgTypeResult.records.length === 0) {
            console.log('Organization not found:', org);
            return res.status(404).json({ error: "Organization not found." });
        }
        const orgType = orgTypeResult.records[0].get('orgType');

        let query;
        if (orgType === 'Company') {
            query = `
                MATCH (org:Organisation {name: $org, type: 'Company'})
                MATCH (p:Person)-[:WORKS_AT]->(org)
                RETURN p.id AS personId, p
            `;
        } else if (orgType === 'University') {
            query = `
                MATCH (org:Organisation {name: $org, type: 'University'})
                MATCH (p:Person)-[:STUDIES_AT]->(org)
                RETURN p.id AS personId, p
            `;
        } else {
            console.log('Unsupported organization type:', orgType);
            return res.status(400).json({ error: "Unsupported organization type." });
        }

        const result = await session.run(query, { org });

        const personIds = result.records.map(record =>
            record.get('personId').toNumber ? record.get('personId').toNumber() : record.get('personId')
        );

        if (personIds.length === 0) {
            // No persons found for this organization
            console.log('No persons found for organization:', org);
            return res.json([]);
        }

        // Convert to string for MongoDB matching
        const personIdsAsStrings = personIds.map(id => id.toString());

        // Aggregate likes per person in MongoDB
        const likesAggregation = await Person_likes_Post.aggregate([
            { $match: { PersonId: { $in: personIdsAsStrings } } },
            { $group: { _id: "$PersonId", likesCount: { $sum: 1 } } },
        ]);

        const likesMap = likesAggregation.reduce((acc, doc) => {
            acc[doc._id] = doc.likesCount;
            return acc;
        }, {});

        const persons = result.records
            .map(record => {
                const id = record.get('personId');
                const idNum = id.toNumber ? id.toNumber() : id;
                const idStr = idNum.toString();

                const personProps = record.get('p').properties;
                personProps.id = idNum;

                // Convert email to array of strings, splitting by ';'
                if (personProps.email && typeof personProps.email === 'string') {
                    personProps.email = personProps.email.split(';').map(e => e.trim()).filter(e => e.length > 0);
                }

                return {
                    person: personProps,
                    likesCount: likesMap[idStr] || 0
                };
            })
            .filter(personObj => personObj.likesCount >= likesCount);

        res.json(persons);

    } catch (error) {
        console.error('Error in CrossDB Query:', error);
        res.status(500).json({ error: 'CrossDB query failed' });
    } finally {
        await session.close();
    }
};

// Controller function to get the most active organizations in terms of posts and acquaintances of 
// their members
export const getMostActiveOrganizations = async (req, res) => {
    const { count } = req.params;
    const limit = parseInt(count, 10);

    const session = driver.session();
    try {

        // Get all organizations and their persons from Neo4j
        const query = `
            MATCH (org:Organisation)<-[:WORKS_AT|STUDIES_AT]-(p:Person)
            OPTIONAL MATCH (p)-[:KNOWS]->(a:Person)
            WITH org, collect(DISTINCT p.id) AS personIds, count(DISTINCT a) AS totalAcquaintances
            RETURN org, personIds, totalAcquaintances
        `;

        const result = await session.run(query);
        if (result.records.length === 0) {
            console.log('No organizations found');
            return res.json([]);
        }

        // Prepare organization data
        const orgs = result.records.map(record => {
            const orgProps = record.get('org').properties;

            // Convert id fields to numbers if needed
            if (orgProps.id && orgProps.id.toNumber) {
                orgProps.id = orgProps.id.toNumber();
            }

            // Convert LocationPlaceId to a number if needed
            if (orgProps.LocationPlaceId && orgProps.LocationPlaceId.toNumber) {
                orgProps.LocationPlaceId = orgProps.LocationPlaceId.toNumber();
            }

            return {
                ...orgProps,
                personIds: record.get('personIds').map(id => id.toString()),
                totalAcquaintances: record.get('totalAcquaintances').toInt()
            };
        });

        // For each org, count likes in MongoDB
        const orgStats = await Promise.all(orgs.map(async org => {
            let likesCount = 0;

            if (org.personIds.length > 0) {
                likesCount = await Person_likes_Post.countDocuments({
                    PersonId: { $in: org.personIds }
                });
            }

            return {
                ...org,
                likesCount,
                activityScore: likesCount + org.totalAcquaintances
            };
        }));

        // Sort by (likes + acquaintances) and limit to top N
        orgStats.sort((a, b) => b.activityScore - a.activityScore);
        const topOrgs = orgStats.slice(0, limit);
        res.json(topOrgs);

    } catch (error) {
        console.error('Error in CrossDB Query:', error);
        res.status(500).json({ error: 'CrossDB query failed' });
    } finally {
        await session.close();
    }
};