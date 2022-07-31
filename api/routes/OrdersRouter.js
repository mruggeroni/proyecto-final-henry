import { Router } from 'express';
import { 
	getOrders,
    getOrderDetail,
    patchStatusOrder,
    getCarts,
	createCart,
    updateCart,
    patchStatusCart,
    deleteCart,
} from '../controllers/OrdersController.js';

const router = Router();

router.get('/orders', getOrders);
router.get('/order/:orderId', getOrderDetail);
router.patch('/order/:orderId', patchStatusOrder);

router.get('/carts/:userId', getCarts);
router.post('/cart/:userId', createCart);
router.put('/cart/:cartId', updateCart);
router.patch('/cart/:cartId', patchStatusCart);
router.delete('/cart/:cartId', deleteCart);

export default router;