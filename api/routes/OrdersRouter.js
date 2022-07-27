import { Router } from 'express';
import { getOrders } from '../controllers/OrdersController.js';

const router = Router();

router.get('/orders', getOrders);

export default router;