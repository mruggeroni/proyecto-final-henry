
import { Router } from 'express';
import { createClassification, getClassification, putClassification } from '../controllers/CategoriesController.js';
import { verifyAdminOrSuperAdminPermission } from '/home/sadnena/pf/proyecto-final-henry/api/Auth/mw.js';
const router = Router();

router.get('/classification', getClassification);
router.post('/classification', verifyAdminOrSuperAdminPermission, createClassification);
router.put('/classification/:id', verifyAdminOrSuperAdminPermission, putClassification)

export default router; 