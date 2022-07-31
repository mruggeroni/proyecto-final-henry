import { Router } from 'express';
import { putClassification } from '../controllers/CategoriesController.js';
import { createDestination, getDestination } from '../controllers/DestinationsControllers.js';
// import { verifyAdminOrSuperAdminPermission, verifyJwt } from '/home/sadnena/pf/proyecto-final-henry/api/Auth/mw.js';
import { verifyAdminOrSuperAdminPermission, verifyJwt } from '../Auth/mw.js';

const router = Router();

router.get('/destinations', getDestination);
router.post('/destinations', verifyJwt, verifyAdminOrSuperAdminPermission,  createDestination);
router.put('/destinations/:id', verifyJwt, verifyAdminOrSuperAdminPermission, putClassification);

export default router;