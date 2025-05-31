import express from 'express';
import cors from 'cors';
import connectMongoDB from './config/connectMongoDB.js';
import mongodbRouter from './src/routes/mongodbRoutes.js'; 
import neo4jRouter from './src/routes/neo4jRoutes.js';
import crossdbRouter from './src/routes/crossdbRoutes.js'; 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

connectMongoDB();

app.use('/api/mongodb', mongodbRouter); // Use MongoDB routes
app.use('/api/neo4j', neo4jRouter); // Use Neo4j routes
app.use('/api/crossdb', crossdbRouter); // Use Cross-DB routes

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});