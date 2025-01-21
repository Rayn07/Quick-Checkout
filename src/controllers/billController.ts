import { Request, Response } from 'express';
import { BillData, SendBillRequestBody } from '../types/bill';
import { validateItems } from '../middleware/validateBill';
import { calculateTotal } from '../utils/billGenerator';
import { sendBillEmail } from '../services/emailService';

export const generateBill = (req: Request, res: Response): void => {
  const billData: BillData = {
    billNumber: req.app.locals.billNumber,
    date: new Date().toLocaleDateString(),
    customerName: 'Aarya Upadhya',
    items: [
      { description: 'Product 1', quantity: 2, price: 156 },
      { description: 'Product 2', quantity: 1, price: 225 },
      { description: 'Product 3', quantity: 1, price: 125 },
    ],
  };

  const validation = validateItems(billData.items);
  if (!validation.valid) {
    res.status(400).send(validation.message);
    return;
  }

  const totalAmount: number = calculateTotal(billData.items);
  billData.total = totalAmount;
  res.render('bill', { bill: billData });
};

export const sendBill = async (req: Request, res: Response): Promise<void> => {
  const { email, billData: billDataString } = req.body as SendBillRequestBody;
  
  if (!email || !billDataString) {
    res.status(400).send('Email and bill data are required');
    return;
  }

  try {
    const billDetails: BillData = JSON.parse(billDataString);
    
    const validation = validateItems(billDetails.items);
    if (!validation.valid) {
      res.status(400).send(validation.message);
      return;
    }

    billDetails.total = calculateTotal(billDetails.items);

    await sendBillEmail(email, billDetails);
    res.status(200).send('Bill sent successfully');
  } catch (error) {
    console.error('Error processing bill data:', error);
    res.status(500).send('Failed to process or send bill');
  }
};