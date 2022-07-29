import { Router } from 'express';
// import { getActivities, createActivity } from '../controllers/ActivitiesController.js';
import { 
  createUser,
  deleteUser,
  getDeletedUsers,
  getUsers,
  patchIs_adminProperty,
  putUser,
  restoreUser,
} from '../controllers/UsersController.js';
import express from 'express'
import { verifyJwt } from '../Auth/mw.js';

const router = Router();

router.get('/user', getUsers);
router.get('/deletedUsers', getDeletedUsers)
router.get('/restoreUser/:id', restoreUser)
router.post('/user', createUser)
router.put('/user/:id', putUser)
router.patch('/user/:id', patchIs_adminProperty)
router.delete('/user/:id', deleteUser)

export default router;