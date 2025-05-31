import express from 'express';
import { getPersons, getOrganizations, getAcquaintancesOfPersonById, getPersonsWithMostAcquaintances } from '../controllers/neo4jControllers.js';

const router = express.Router();

router.get('/', getPersons);
router.get('/organizations', getOrganizations);
router.get('/acquaintances/:id', getAcquaintancesOfPersonById); 
router.get('/most-acquaintances/:count', getPersonsWithMostAcquaintances); 

export default router;