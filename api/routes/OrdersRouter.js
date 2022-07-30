import { Router } from 'express';
import { verifyAdminOrSuperAdminPermission } from '../Auth/mw.js';
import { getOrders } from '../controllers/OrdersController.js';

const router = Router();

router.get('/orders', verifyAdminOrSuperAdminPermission, getOrders);

export default router;