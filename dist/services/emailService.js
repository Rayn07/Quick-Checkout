"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendBillEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendBillEmail = (email, billDetails) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const emailContent = `
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
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Invoice #${billDetails.billNumber}`,
        html: emailContent,
    };
    yield transporter.sendMail(mailOptions);
});
exports.sendBillEmail = sendBillEmail;
//# sourceMappingURL=emailService.js.map