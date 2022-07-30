import { Router } from 'express';
import { 
	createCart, 
	getOrderDetail, 
	getOrders,
	createOrder,
	getOrdersByStatus,
    getCart,
} from '../controllers/OrdersController.js';

const router = Router();

router.get('/cart/:userId', getCart);
router.get('/orders', getOrders);
router.get('/orders/:status', getOrdersByStatus);
router.get('/order/:id', getOrderDetail);
router.post('/orders', createOrder);
router.post('/cart', createCart);

export default router;