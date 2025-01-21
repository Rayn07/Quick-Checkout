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
			const { name, address, location } = req.body;

			if (!name || !address) {
				return next(
					new ErrorHandler("Name and Address required!", 400)
				);
			}

			const storeExists = await storeModel.findOne({ name, location });

			if (storeExists) {
				return next(
					new ErrorHandler(
						"Store at that location already exists!",
						400
					)
				);
			}

			const storeData = req.body;
			const store = new storeModel(storeData);
			store
				.save()
				.then((result) => {
					res.json({
						status: true,
						storeData,
					});
				})
				.catch((error) => {
					return next(
						new ErrorHandler(
							`Store Registration Failed. ${error.message}`,
							500
						)
					);
				});
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 500));
		}
	}
);

export const searchStore = CatchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const query = req.query.store as String;
			const pattern = "^" + query + ".*$";
			const results = query
				? await storeModel.find({
						name: { $regex: pattern, $options: "i" },
				  })
				: await storeModel.find();

			res.json({
				status: true,
				storeDetails: results,
			});
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 500));
		}
	}
);

export const saveStore = CatchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const storeName = req.params.storeName;
			const store = await storeModel.findOne({ name: storeName });
			const username = req.headers.username;
			const user = await userModel.findOne({ name: username });

			if (!store) {
				return next(new ErrorHandler("Store not found", 404));
			}
			if (!user) {
				return next(new ErrorHandler("User not found", 404));
			}

			res.locals.store = store;

			next();
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 500));
		}
	}
);

export const getStoreDetails = CatchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const user = req.user;
			const store = res.locals.store;

			let cart = await cartModel.findOne({
				user: user?._id,
				store: store._id,
			});

			if (!cart) {
				cart = await new cartModel({
					user: user?._id,
					store: store._id,
				}).save();
			}

			await userModel.findOneAndUpdate(
				{ name: req.headers.username },
				{ cart: cart._id }
			);

			res.status(200).json({
				status: true,
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
			const productName = req.body.productName;
			const user = req.user;
			const store = res.locals.store;

			const product = await productModel.findOne({
				store: store._id,
				name: productName,
			});
			if (!product) {
				return next(new ErrorHandler("Product not found", 404));
			}

			const cart = await cartModel.findOne({
				user: user?._id,
				store: store._id,
			});

			if (!cart) {
				return next(new ErrorHandler("Cart not found", 404));
			}

			cart.addItem(productName).then((result) => {
				if (result.status) {
					res.json({
						status: true,
						message: "Product added to cart",
					});
				} else {
					return next(
						new ErrorHandler(
							`Failed to add product to cart. ${result.message}`,
							500
						)
					);
				}
			});
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 500));
		}
	}
);

export const removeProduct = CatchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const productName = req.body.productName;
			const user = req.user;
			const store = res.locals.store;

			const product = await productModel.findOne({
				store: store._id,
				name: productName,
			});
			if (!product) {
				return next(new ErrorHandler("Product not found", 404));
			}

			const cart = await cartModel.findOne({
				user: user?._id,
				store: store._id,
				productList: { $elemMatch: { product: product._id } },
			});

			if (!cart) {
				return next(new ErrorHandler("Product not in cart", 404));
			}

			cart.removeItem(productName)
				.then(() => {
					res.json({
						status: true,
						message: "Item quantity reduced",
					});
				})
				.catch((error: any) => {
					return next(
						new ErrorHandler(
							`Failed to reduce product quantity. ${error.message}`,
							500
						)
					);
				});
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 500));
		}
	}
);

export const getCartDetails = CatchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const user = req.user;
			const store = res.locals.store;
			const cart = await cartModel.findOne({
				user: user?._id,
				store: store._id,
			});

			if (!cart) {
				return next(new ErrorHandler("Cart not found", 404));
			}

			await cart.updateCartPrices().then((result) => {
				if (!result.status)
					return next(new ErrorHandler(result.message, 500));
			});

			res.json({ status: true, cart });
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 500));
		}
	}
);

export const createProduct = CatchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			for (const eachProduct of req.body) {
				const { name, mrp, store } = eachProduct;
				if (!name || !mrp || !store) {
					return next(
						new ErrorHandler("Name, MRP and Store required!", 400)
					);
				}

				const storeDoc = await storeModel.findOne({ name: store });
				if (!storeDoc) {
					return next(new ErrorHandler("Store not found", 404));
				}

				const productData = { name, mrp, store: storeDoc._id };
				const product = new productModel(productData);
				product.save().catch((error: any) => {
					return next(
						new ErrorHandler(
							`Product Creation Failed. ${error.message}`,
							500
						)
					);
				});
			}

			res.json({
				status: true,
				message: "Products created successfully",
			});
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 500));
		}
	}
);
