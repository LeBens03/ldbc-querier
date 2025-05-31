import neo4jDriver from '../../config/connectNeo4j.js';  

let driver;

neo4jDriver().then(d => driver = d).catch(err => {
  console.error('Failed to connect to Neo4j on startup:', err);
  process.exit(1);
});

// Controller function to get all persons
export const getPersons = async (req, res) => {
  const session = driver.session();
  try {
    const result = await session.run('MATCH (n:Person) RETURN n');
    let persons = result.records.map(record => {
      const properties = record.get('n').properties;

      // Convert id to a number if applicable
      if (properties.id && properties.id.toNumber) {
        properties.id = properties.id.toNumber();
      }
      // Convert email to array of strings, splitting by ';'
      if (properties.email && typeof properties.email === 'string') {
        properties.email = properties.email.split(';').map(e => e.trim()).filter(e => e.length > 0);
      }

      return properties;
    });
    res.json(persons);
  } catch (error) {
    console.error('Neo4j query error:', error);
    res.status(500).json({ error: 'Neo4j query failed' });
  } finally {
    await session.close();
  }
};

// Controller function to get all organizations where someone works or studies
export const getOrganizations = async (req, res) => {
  const session = driver.session();
  try {
    const result = await session.run('MATCH (:Person)-[:WORKS_AT|STUDIES_AT]->(c:Organisation) RETURN DISTINCT c');
    let organizations = result.records.map(record => {
      const properties = record.get('c').properties;

      // Convert id to a number if applicable
      if (properties.id && properties.id.toNumber) {
        properties.id = properties.id.toNumber();
      }
      // Convert LocationPlaceId to a number if applicable
      if (properties.LocationPlaceId && properties.LocationPlaceId.toNumber) {
        properties.LocationPlaceId = properties.LocationPlaceId.toNumber(); 
      }
      return properties;
    });
    res.json(organizations);
  } catch (error) {
    console.error('Neo4j query error:', error);
    res.status(500).json({ error: 'Neo4j query failed' });
  } finally {
    await session.close();
  }
};

// Controller function to get acquaintances of a person by ID
export const getAcquaintancesOfPersonById = async (req, res) => {
    const { id } = req.params;
    const session = driver.session();
    try {
        const result = await session.run(
            'MATCH (p:Person)-[:KNOWS]->(a:Person) WHERE p.id = $id RETURN a',
            { id: parseInt(id) }
        );

        const acquaintances = result.records.map(record => {
            const properties = record.get('a').properties; 

            // Convert id to a number if applicable
            if (properties.id && properties.id.toNumber) {
                properties.id = properties.id.toNumber(); 
            }
            // Convert email to array of strings, splitting by ';'
            if (properties.email && typeof properties.email === 'string') {
                properties.email = properties.email.split(';').map(e => e.trim()).filter(e => e.length > 0);
            }

            return properties;
        });

        res.json(acquaintances);
    } catch (error) {
        console.error('Neo4j query error:', error);
        res.status(500).json({ error: 'Neo4j query failed' });
    } finally {
        await session.close();
    }
};

// Controller function to get persons with the most acquaintances
export const getPersonsWithMostAcquaintances = async (req, res) => {
  let { count } = req.params;

  const session = driver.session();
  try {
    const query = `
      MATCH (p:Person)
      OPTIONAL MATCH (p)-[:KNOWS]->(a:Person)
      WITH p, count(a) AS acquaintancesCount
      RETURN p, acquaintancesCount
      ORDER BY acquaintancesCount DESC
      LIMIT toInteger($count)
    `;

    const result = await session.run(query, { count });
    const persons = result.records.map(record => {
      const properties = record.get('p').properties;

      // Convert id to a number if applicable
      if (properties.id && properties.id.toNumber) {
        properties.id = properties.id.toNumber();
      }
      // Convert email to array of strings, splitting by ';'
      if (properties.email && typeof properties.email === 'string') {
        properties.email = properties.email.split(';').map(e => e.trim()).filter(e => e.length > 0);
      }

      return {
        ...properties,
        acquaintancesCount: record.get('acquaintancesCount').toInt(),
      };
    });

    res.json(persons);
  } catch (error) {
    console.error('Neo4j query error:', error);
    res.status(500).json({ error: 'Neo4j query failed' });
  } finally {
    await session.close();
  }
};