import { Router } from 'express';
// import { getActivities, createActivity } from '../controllers/ActivitiesController.js';
import { 
  createUser,
  getUsers,
  patchIs_adminProperty,
  putUser,
} from '../controllers/UsersController.js';
import express from 'express'
import { verifyJwt } from '../Auth/mw.js';

const router = Router();

router.get('/user', getUsers);
router.post('/user', createUser)
router.put('/user/:id', putUser)
router.patch('/user/:id', patchIs_adminProperty)

export default router;