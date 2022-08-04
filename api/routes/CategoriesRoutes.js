
import { Router } from 'express';
import { createClassification, getClassification, putClassification } from '../controllers/CategoriesController.js';
// import { verifyAdminOrSuperAdminPermission, verifyJwt } from '/home/sadnena/pf/proyecto-final-henry/api/Auth/mw.js';
import { verifyAdminOrSuperAdminPermission, verifyJwt } from '../Auth/mw.js';
const router = Router();

router.get('/classification', getClassification);
router.post('/classification', verifyJwt, verifyAdminOrSuperAdminPermission, createClassification);
router.put('/classification/:id', verifyJwt, verifyAdminOrSuperAdminPermission, putClassification)

export default router; 