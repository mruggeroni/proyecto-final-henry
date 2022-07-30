import { Router } from 'express';
import { putClassification } from '../controllers/CategoriesController.js';
import { createDestination, getDestination } from '../controllers/DestinationsControllers.js';
import { verifyAdminOrSuperAdminPermission } from '/home/sadnena/pf/proyecto-final-henry/api/Auth/mw.js';
const router = Router();

router.get('/destinations', getDestination);
router.post('/destinations',verifyAdminOrSuperAdminPermission,  createDestination);
router.put('/destinations/:id', verifyAdminOrSuperAdminPermission, putClassification);

export default router;