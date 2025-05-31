import express from 'express';
import { getPersonsByOrganizationAndLikes, getMostActiveOrganizations } from '../controllers/crossdbControllers.js';

const router = express.Router();

router.get('/members/:org/:minLikes', getPersonsByOrganizationAndLikes); 
router.get('/organizations/:count', getMostActiveOrganizations); 

export default router;