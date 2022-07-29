import { Router } from 'express';
// import { getActivities, createActivity } from '../controllers/ActivitiesController.js';
import { 
  createUser,
  getUsers,
  putUser,
} from '../controllers/UsersController.js';
import express from 'express'
import { verifyJwt } from '../Auth/mw.js';

const router = Router();

router.get('/user', getUsers);
router.post('/user', createUser)
router.put('/user/:id', putUser)

export default router;