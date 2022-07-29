import { Router } from 'express';
// import { getActivities, createActivity } from '../controllers/ActivitiesController.js';
import { getUsers } from '../controllers/UsersController.js';

const router = Router();

router.get('/users', getUsers);

export default router;