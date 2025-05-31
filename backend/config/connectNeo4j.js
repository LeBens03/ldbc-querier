import neo4j from 'neo4j-driver';
import dotenv from 'dotenv';

dotenv.config();

const neo4jDriver = async () => {
  const driver = neo4j.driver(
    process.env.NEO4J_URI || 'bolt://localhost:7687',
    neo4j.auth.basic(
      process.env.NEO4J_USER || 'neo4j',
      process.env.NEO4J_PASSWORD || 'ldbcmaadb'
    )
  );

  try {
    await driver.verifyConnectivity();
    console.log('Connected to Neo4j');
    return driver;
  } catch (err) {
    console.error('Neo4j connection error:', err);
    throw err;  
  }
};

export default neo4jDriver;