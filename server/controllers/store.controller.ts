import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import storeModel from "../models/store.model";
import cartModel from "../models/cart.model";
import productModel from "../models/product.model";
import userModel from "../models/user.model";

export const addStore = CatchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { name, address, location, image } = req.body;

			if (!name || !address) {
				return next(
					new ErrorHandler("Name and Address required!", 400)
				);
			}

			const storeExists = await storeModel.findOne({ name, address });

			if (storeExists) {
				return next(
					new ErrorHandler(
						"Store at that address already exists!",
						400
					)
				);
			}

			const storeData = req.body;
			let store = new storeModel(storeData);
			store
				.save()
				.then((result) => {
					res.json({
						success: true,
						storeData,
					});
				})
				.catch((error) => {
					res.json({
						success: false,
						message: `store Registration Failed! ${error}`,
					});
				});
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 500));
		}
	}
);

export const getStore = CatchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const storeName = req.params.storeName;
			const store = await storeModel.findOne({ name: storeName });
			const username = req.headers.username;

			if (!store) {
				return next(new ErrorHandler("Store not found", 404));
			}

			const cart = await new cartModel({ store: storeName }).save();
			await userModel.findOneAndUpdate(
				{ name: username },
				{ cart: cart._id }
			);

			res.status(200).json({
				success: true,
				store,
			});
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 500));
		}
	}
);

export const addProduct = CatchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const storeName = req.params.storeName;
			const productName = req.body.productName;

			const product = await productModel.findOne({
				store: storeName,
				name: productName,
			});
			if (!product) {
				return next(new ErrorHandler("Product not found", 404));
			}

			let cart = await cartModel.findOne({ store: storeName });

			if (!cart) {
				return next(new ErrorHandler("Cart not found", 404));
			}

			cart.addToCart(productName)
				.then(() => {
					res.json({
						success: true,
						message: "Product added to cart",
					});
				})
				.catch((error: any) => {
					return next(
						new ErrorHandler("Failed to add product to cart", 500)
					);
				});
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 500));
		}
	}
);

export const removeProduct = CatchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const storeName = req.params.storeName;
			const productName = req.body.productName;

			const product = await productModel.findOne({
				store: storeName,
				name: productName,
			});
			if (!product) {
				return next(new ErrorHandler("Product not found", 404));
			}

			let cart = await cartModel.findOne({
				store: storeName,
				productList: { $elemMatch: { product: product._id } },
			});

			if (!cart) {
				return next(new ErrorHandler("Product not in cart", 404));
			}

			cart.reduceQuantity(productName)
				.then(() => {
					res.json({
						success: true,
						message: "Item quantity reduced",
					});
				})
				.catch((error: any) => {
					return next(
						new ErrorHandler(
							"Failed to reduce product quantity",
							500
						)
					);
				});
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 500));
		}
	}
);

export const getCart = CatchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const storeName = req.body.storeName;
			const cart = await cartModel.findOne({ store: storeName });
			if (!cart) {
				return next(new ErrorHandler("Cart not found", 404));
			}
			res.json({ success: true, cart });
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 500));
		}
	}
);
