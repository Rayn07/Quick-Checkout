const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true })); 
app.set('view engine', 'ejs');  

funcbillgenrator = (length = 9) => {
const char1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
let billnum = ''

var i = 0 ;
for(i = 0 ; i <length ; i++){
    const random1 = Math.floor(Math.random() * char1.length);
    billnum += char1[random1];
}
return billnum;

}


const billnum = funcbillgenrator();
console.log(billnum);

app.use(express.static(path.join(__dirname, 'public')));


const billData = {
  billNumber: funcbillgenrator(),
  date: new Date().toLocaleDateString(),
  customerName: 'Aarya Upadhya',
  items: [
    { description: 'Product  1', quantity: 2, price: 156 }, // data has been hardcoded as of now 
    { description: 'Product  2', quantity: 1, price: 225 }, // will replace with the database when created 
    { description: 'Product  3', quantity: 1, price: 125},
    { description: 'Product  4', quantity: 1 ,price: 100},

  ],
};


app.get('/generate-bill', (req, res) => {
  const totalAmount = billData.items.reduce((total, item) => total + (item.quantity * item.price), 0);
  billData.total = totalAmount;


  res.render('bill', { bill: billData });
});


app.post('/send-bill', (req, res) => {
  const { email, billData } = req.body;

  const totalAmount = JSON.parse(billData).items.reduce((total, item) => total + (item.quantity * item.price), 0);
  const billDetails = JSON.parse(billData);
  billDetails.total = totalAmount;

  require('dotenv').config(); 
const transporter = nodemailer.createTransport({
  service: 'gmail',  
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,  
  },
});

  const emailContent = `
    <h1>Invoice # Rs{billDetails.billNumber}</h1>
    <p>Date: {billDetails.date}</p>
    <p>Customer: {billDetails.customerName}</p>
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
              <td>$${item.price}</td>
              <td>$${item.quantity * item.price}</td>
            </tr>
          `)
          .join('')}
      </tbody>
    </table>
    <h3>Total Amount: ${billDetails.total} indian rupees</h3>
  `;

  const mailOptions = {
    from: 'your-email@gmail.com',  
    to: email,                    
    subject: `Invoice #${billDetails.billNumber}`,
    html: emailContent,           
  };

  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Failed to send email');
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).send('Bill sent successfully');
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
