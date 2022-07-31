import { Router } from 'express';
import { verifyAdminOrSuperAdminPermission, verifyJwt } from '../Auth/mw.js';
import { getOrders } from '../controllers/OrdersController.js';

const router = Router();

router.get('/orders', verifyJwt, verifyAdminOrSuperAdminPermission, getOrders);

export default router;