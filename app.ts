import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import billRoutes from './routes/billRoutes';
import { funcBillGenerator } from './utils/billGenerator';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


app.locals.billNumber = funcBillGenerator();

app.use('/', billRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});