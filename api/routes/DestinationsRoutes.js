import { Router } from 'express';
import { putClassification } from '../controllers/CategoriesController.js';
import { createDestination, getDestination } from '../controllers/DestinationsControllers.js';

const router = Router();

router.get('/destinations', getDestination);
router.post('/destinations', createDestination);
router.put('/destinations/:id', putClassification);

export default router;
