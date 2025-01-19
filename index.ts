import express, { Request, Response, RequestHandler } from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import ejs from 'ejs';
import dotenv from 'dotenv';

dotenv.config();

interface Item {
  description: string;
  quantity: number;
  price: number;
}

interface BillData {
  billNumber: string;
  date: string;
  customerName: string;
  items: Item[];
  total?: number;
}


const validateItems = (items: Item[]): { valid: boolean; message: string } => {
  if (!Array.isArray(items)) {
    return { valid: false, message: 'Items must be an array' };
  }
  
  if (items.length > 3) {
    return { valid: false, message: 'Maximum of 3 products allowed' };
  }
  
  if (items.length === 0) {
    return { valid: false, message: 'At least one product is required' };
  }

  return { valid: true, message: 'Valid' };
};

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


const funcBillGenerator = (length: number = 9): string => {
  const chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let billnum: string = '';
  
  for (let i = 0; i < length; i++) {
    const random: number = Math.floor(Math.random() * chars.length);
    billnum += chars[random];
  }
  return billnum;
};

const billData: BillData = { // were the database integration shall come in place
  billNumber: funcBillGenerator(),
  date: new Date().toLocaleDateString(),
  customerName: 'Aarya Upadhya',
  items: [
    { description: 'Product 1', quantity: 2, price: 156 },
    { description: 'Product 2', quantity: 1, price: 225 },
    { description: 'Product 3', quantity: 1, price: 125 },
  ],
};

interface SendBillRequestBody {
  email: string;
  billData: string;
}

// Calculate total amount helper function
const calculateTotal = (items: Item[]): number => {
  return items.reduce((total, item) => total + (item.quantity * item.price), 0);
};

const generateBillHandler: RequestHandler = (req, res): void => {
  const validation = validateItems(billData.items);
  if (!validation.valid) {
    res.status(400).send(validation.message);
    return;
  }

  const totalAmount: number = calculateTotal(billData.items);
  billData.total = totalAmount;
  res.render('bill', { bill: billData });
};

const sendBillHandler: RequestHandler = (req, res): void => {
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

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailContent: string = `
      <h1>Invoice #${billDetails.billNumber}</h1>
      <p>Date: ${billDetails.date}</p>
      <p>Customer: ${billDetails.customerName}</p>
      <table border="1" cellspacing="0" cellpadding="5">
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${billDetails.items
            .map(item => `
              <tr>
                <td>${item.description}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price}</td>
                <td>₹${item.quantity * item.price}</td>
              </tr>
            `)
            .join('')}
        </tbody>
      </table>
      <h3>Total Amount: ₹${billDetails.total}</h3>
    `;

    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Invoice #${billDetails.billNumber}`,
      html: emailContent,
    };

    transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
      if (error) {
        console.error(error);
        res.status(500).send('Failed to send email');
        return;
      } else {
        console.log('Email sent:', info.response);
        res.status(200).send('Bill sent successfully');
        return;
      }
    });
  } catch (error) {
    console.error('Error processing bill data:', error);
    res.status(400).send('Invalid bill data format');
    return;
  }
};



app.get('/generate-bill', generateBillHandler);
app.post('/send-bill', sendBillHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});