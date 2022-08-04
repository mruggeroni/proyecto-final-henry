import { Router } from 'express';
import { PaymentCreate } from '../pay/payment.js';
const router = Router();
router.post('/payment', PaymentCreate )
export default router;