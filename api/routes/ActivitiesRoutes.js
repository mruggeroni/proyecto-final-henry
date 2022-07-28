import { Router } from 'express';
import { getActivities, createActivity, putActivity } from '../controllers/ActivitiesController.js';

const router = Router();

router.get('/activities', getActivities);
router.post('/activities', createActivity);
router.put('/activities/:id', putActivity)

export default router;