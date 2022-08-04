import { Router } from 'express';
// import { verifyAdminOrSuperAdminPermission, verifyJwt } from '../Auth/mw.js';
import { 
	getOrders,
    getOrderDetail,
    patchStatusOrder,
    getCart,
	createCart,
    updateCart,
    patchStatusCart,
    deleteCart,
} from '../controllers/OrdersController.js';

const router = Router();

// router.get('/orders', verifyJwt, verifyAdminOrSuperAdminPermission, getOrders);
router.get('/orders', getOrders);
router.get('/order/:orderId', getOrderDetail);
router.patch('/order/:orderId', patchStatusOrder);

router.get('/cart/:userId', getCart);
router.post('/cart/:userId', createCart);
router.put('/cart/:cartId', updateCart);
router.patch('/cart/:cartId', patchStatusCart);
router.delete('/cart/:cartId', deleteCart);

export default router;