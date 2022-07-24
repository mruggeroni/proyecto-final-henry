import { Router } from 'express';
import { getDestination } from '../controllers/DestinationsControllers.js';

const router = Router();

router.get('/destinations', getDestination);

export default router;