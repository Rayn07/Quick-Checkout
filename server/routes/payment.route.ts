import express, { Request, Response } from "express";
import { isAuthenticated } from "../middleware/auth";
import {
	generateBillTest,
	getPaymentAmount,
	sendBill,
} from "../controllers/payment.controller";
import { generateBill } from "../middleware/generateBill";
const paymentRouter = express.Router();

paymentRouter.get(
	"/payment",
	isAuthenticated,
	(req: Request, res: Response) => {
		res.send("In Payment Router");
	}
);

paymentRouter.get("/payment/amount/:cartId", isAuthenticated, getPaymentAmount);
/* Response Body: JSON
{
	"totalAmount": number,
} */

// FOR TESTING
paymentRouter.get(
	"/payment/generate-bill/:cartId",
	isAuthenticated,
	generateBillTest
);
/* Response Body: HTML
Invoice #FFFFFFFFF
Date: 
Customer: 
Items: <table>
Total Amount:
Send Bill: <form> 
*/

paymentRouter.get(
	"/payment/send-bill/:cartId",
	isAuthenticated,
	generateBill,
	sendBill
);
/* Response Body: HTML
Invoice #FFFFFFFFF
Date: 
Customer: 
Items: <table>
Total Amount:
Send Bill: <form> 
*/

export default paymentRouter;
