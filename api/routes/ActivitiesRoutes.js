import { Router } from 'express';
import { getActivities, createActivity, putActivity } from '../controllers/ActivitiesController.js';
import { verifyJwt } from '../Auth/mw.js';
import { verifyAdminOrSuperAdminPermission } from '/home/sadnena/pf/proyecto-final-henry/api/Auth/mw.js';
const router = Router();

router.get('/activities', getActivities);
router.post('/activities', verifyAdminOrSuperAdminPermission, createActivity);
router.put('/activities/:id', verifyAdminOrSuperAdminPermission, putActivity)

export default router;