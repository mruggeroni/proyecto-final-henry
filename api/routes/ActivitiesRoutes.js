import { Router } from 'express';
import { getActivities, createActivity, putActivity } from '../controllers/ActivitiesController.js';
import { verifyAdminOrSuperAdminPermission, verifyJwt, verifySuperAdminPermission } from '../Auth/mw.js';

const router = Router();

router.get('/activities', getActivities);
router.post('/activities',verifyJwt, verifyAdminOrSuperAdminPermission, createActivity);
router.put('/activities/:id',verifyJwt, verifyAdminOrSuperAdminPermission, putActivity)

export default router;