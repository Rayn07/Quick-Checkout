import nodemailer from 'nodemailer';
import { BillData } from '../types/bill';

export const sendBillEmail = async (email: string, billDetails: BillData): Promise<void> => {
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

  await transporter.sendMail(mailOptions);
};