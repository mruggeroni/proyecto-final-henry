import { Router } from 'express';
// import { verifyAdminOrSuperAdminPermission, verifyJwt } from '../Auth/mw.js';
import { 
	getOrders,
	getOrderDetail, 
	patchStatusOrder,
	getCarts,
	createCart,
	updateCart,
	patchStatusCart,
	deleteCart,
	getCart,
	createOrder
} from '../controllers/OrdersController.js';

const router = Router();

// router.get('/orders', verifyJwt, verifyAdminOrSuperAdminPermission, getOrders);
router.get('/orders', getOrders);
router.get('/orders/:id', getOrderDetail);
router.patch('/order/:orderId', patchStatusOrder);

router.get('/cart/:id', getCart); // Devuelve una orden solo si su status es 'shopping cart0
router.post('/order', createOrder); // para sustituir a createCart

router.get('/carts/:userId', getCarts);
router.post('/cart/:userId', createCart);
router.put('/cart/:cartId', updateCart);
router.patch('/cart/:cartId', patchStatusCart);
router.delete('/cart/:cartId', deleteCart);

export default router;