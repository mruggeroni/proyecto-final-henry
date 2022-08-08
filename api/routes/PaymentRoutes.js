import { Router } from 'express';
import { PaymentCreate } from '../pay/payment.js';
import { PaymentResponse } from '../pay/webhook.js';

const router = Router();
router.post('/payment', PaymentCreate)
router.post('/payment/webhook')
export default router;