
import { Router } from 'express';
import { createClassification, getClassification, putClassification } from '../controllers/CategoriesController.js';

const router = Router();

router.get('/classification', getClassification);
router.post('/classification', createClassification);
router.put('/classification/:id', putClassification)

export default router;