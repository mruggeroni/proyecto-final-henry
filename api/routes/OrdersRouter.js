import { Router } from 'express';
import { 
	createCart, 
	getOrderDetail, 
	getOrders,
    getCart,
} from '../controllers/OrdersController.js';

const router = Router();

router.get('/cart/:userId', getCart);
router.get('/orders', getOrders);
router.get('/orders/:id', getOrderDetail);
router.post('/cart/:userId', createCart);

export default router;