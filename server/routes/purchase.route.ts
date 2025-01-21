import express, { Request, Response } from "express";
import { isAuthenticated } from "../middleware/auth";
import { getPurchaseAmount } from "../controllers/purchase.controller";
const purchaseRouter = express.Router();
purchaseRouter.get(
	"/purchase",
	isAuthenticated,
	(req: Request, res: Response) => {
		res.send("In Purchase Router");
	}
);
purchaseRouter.get(
	"/purchase/amount/:cartId",
	isAuthenticated,
	getPurchaseAmount
);
/* Response Body: JSON
{
	"totalAmount": number,
} */
export default purchaseRouter;
