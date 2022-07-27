import { Router } from 'express';
import { createDestination, getDestination } from '../controllers/DestinationsControllers.js';

const router = Router();

router.get('/destinations', getDestination);
router.post('/destinations', createDestination)

export default router;