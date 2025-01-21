import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import storeModel from "../models/store.model";
import cartModel from "../models/cart.model";
import productModel from "../models/product.model";
import userModel from "../models/user.model";
import { BillData, SendBillRequestBody } from "../types/bill.interface.";
import { sendBillEmail } from "../utils/sendMail";
import { funcBillGenerator } from "../utils/billNumberGen";
import purchaseModel from "../models/purchase.model";

export const getPaymentAmount = CatchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.cartId;
			const cart = await cartModel.findById(id);
			const totalAmount = cart?.cartTotal;
			if (totalAmount) {
				res.json({
					status: true,
					totalAmount,
				});
			} else {
				return next(
					new ErrorHandler("Cart value must be greater than 0", 422)
				);
			}
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 500));
		}
	}
);

export const generateBill = CatchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.cartId;
			const cart = await cartModel
				.findById(id)
				.populate("productList.product");

			if (!cart) {
				return next(new ErrorHandler("Failed to get cart", 400));
			}

			const newPurchase = await purchaseModel.create({ cart });
			// Check if same cartid purchase exists already (since cart deleted after each purchase, this shouldnt be an issue ig)
			const billNum = funcBillGenerator();
			const username = req.user?.name || "Guest";

			const items = cart.productList.map(({ product, quantity }) => ({
				description: product.name,
				quantity,
				price: product.discountPrice,
			}));

			const billData: BillData = {
				billNumber: billNum,
				date: new Date().toLocaleDateString(),
				customerName: username,
				items,
				total: cart.cartTotal,
			};

			await purchaseModel.updateOne(
				{ _id: newPurchase._id },
				{ status: "Successful" }
			);

			await cartModel.deleteOne({ _id: cart._id });

			res.render("bill", { bill: billData });
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 500));
		}
	}
);

// export const sendBill = async (req: Request, res: Response): Promise<void> => {
// 	const { email, billData: billDataString } = req.body as SendBillRequestBody;

// 	if (!email || !billDataString) {
// 		res.status(400).send("Email and bill data are required");
// 		return;
// 	}

// 	try {
// 		const billDetails: BillData = JSON.parse(billDataString);

// 		const validation = validateItems(billDetails.items);
// 		if (!validation.valid) {
// 			res.status(400).send(validation.message);
// 			return;
// 		}

// 		billDetails.total = calculateTotal(billDetails.items);

// 		await sendBillEmail(email, billDetails);
// 		res.status(200).send("Bill sent successfully");
// 	} catch (error) {
// 		console.error("Error processing bill data:", error);
// 		res.status(500).send("Failed to process or send bill");
// 	}
// };
