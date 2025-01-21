import express, { Request, Response } from "express";
import { isAuthenticated } from "../middleware/auth";
import {
	generateBill,
	getPaymentAmount,
} from "../controllers/payment.controller";
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

paymentRouter.get(
	"/payment/generate-bill/:cartId",
	isAuthenticated,
	generateBill
);
/* Response B
paymentRouter.post('/payment/send-bill', isAuthenticated, sendBill);*/

export default paymentRouter;
