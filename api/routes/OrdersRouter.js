import { Router } from 'express';
import { 
	createOrder, 
	getOrderDetail, 
	getOrders 
} from '../controllers/OrdersController.js';

const router = Router();

router.get('/orders', getOrders);
router.get('/orders/:id', getOrderDetail);
router.post('/orders', createOrder);

export default router;