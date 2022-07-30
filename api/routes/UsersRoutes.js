import { Router } from 'express';
// import { getActivities, createActivity } from '../controllers/ActivitiesController.js';
import { createUser, getUsers, getUserDetail, getUserStatus } from '../controllers/UsersController.js';
import express from 'express'
import { verifyJwt } from '../Auth/mw.js';

const router = Router();

router.get('/user/status/:id', getUserStatus);
router.get('/user/:id', getUserDetail);
router.get('/users', getUsers);
router.post('/user', createUser);

export default router;