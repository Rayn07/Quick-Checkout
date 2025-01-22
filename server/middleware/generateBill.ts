import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncError";
import cartModel from "../models/cart.model";
import ErrorHandler from "../utils/ErrorHandler";
import purchaseModel from "../models/purchase.model";
import { funcBillGenerator } from "../utils/billNumberGen";
import { BillData } from "../types/bill.interface.";

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

			res.locals.billData = billData;

			await purchaseModel.updateOne(
				{ _id: newPurchase._id },
				{ status: "Successful" }
			);

			await cartModel.deleteOne({ _id: cart._id });

			next();
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 500));
		}
	}
);
