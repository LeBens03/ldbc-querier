import express from 'express';
import { getPosts, getPostsByYear, getPostsCountByLanguage } from '../controllers/mongodbControllers.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/count', getPostsCountByLanguage);
router.get('/:year', getPostsByYear);

export default router;
