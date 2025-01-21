import express from 'express';
import { generateBill, sendBill } from '../controllers/billController';

const router = express.Router();

router.get('/generate-bill', generateBill);
router.post('/send-bill', sendBill);

export default router;
