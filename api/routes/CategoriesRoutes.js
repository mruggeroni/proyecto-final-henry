
import { Router } from 'express';
import { createClassification, getCategories } from '../controllers/CategoriesController.js';


const router = Router();

router.get('/categories', getCategories);
router.post('/classification', createClassification);

export default router;