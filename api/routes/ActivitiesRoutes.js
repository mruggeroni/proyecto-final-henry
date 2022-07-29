import { Router } from 'express';
import { getActivities, createActivity } from '../controllers/ActivitiesController.js';

const router = Router();

router.get('/activities', getActivities);
router.post('/activities', createActivity);


export default router;