import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import storeModel from "../models/store.model";
import cartModel from "../models/cart.model";
import productModel from "../models/product.model";
import userModel from "../models/user.model";

export const getPurchaseAmount = CatchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const _id = req.params.cartId;
			const cart = await cartModel.findOne({ _id });
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
