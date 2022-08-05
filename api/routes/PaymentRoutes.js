import { Router } from 'express';
import { PaymentCreate } from '../pay/payment.js';
import { PaymentResponse } from '../pay/webhook.js';
import express from 'express';

const router = Router();
router.post('/payment', PaymentCreate)
router.post('/payment/webhook', express.raw({type: "application/json"}))
export default router;