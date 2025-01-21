import mongoose, { Document, Model, Schema, Types } from "mongoose";
import Product, { IProduct } from "./product.model";

export interface ICart extends Document {
	user: Types.ObjectId;
	store: Types.ObjectId;
	productList: Array<{
		product: IProduct;
		quantity: number;
		itemTotal: number;
		_id: Types.ObjectId;
	}>;
	cartTotal: number;
	addItem: (
		productName: string
	) => Promise<{ status: boolean; message: string }>;
	removeItem: (
		productName: string
	) => Promise<{ status: boolean; message: string }>;
	updateItemPrice: (
		productName: IProduct
	) => Promise<number | { status: boolean; message: string }>;
	updateCartPrices: () => Promise<{ status: boolean; message: string }>;
}

const cartSchema: Schema<ICart> = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		store: { type: Schema.Types.ObjectId, ref: "Store", required: true },
		productList: [
			{
				product: { type: Schema.Types.ObjectId, ref: "Product" },
				quantity: { type: Number },
				itemTotal: { type: Number },
			},
		],
		cartTotal: { type: Number },
	},
	{ timestamps: true }
);

cartSchema.methods.addItem = async function (
	productName: string
): Promise<{ status: boolean; message: string }> {
	try {
		const product = await Product.findOne({
			store: this.store,
			name: productName,
		});
		if (!product) return { status: false, message: "Product not found" };

		const productExists = this.productList.some(
			(item: { product: Types.ObjectId }) =>
				item.product.equals(product._id as Types.ObjectId)
		);

		if (productExists) {
			await cartModel.updateOne(
				{ _id: this._id },
				{ $inc: { "productList.$[item].quantity": 1 } },
				{ arrayFilters: [{ "item.product": product._id }] }
			);

			return {
				status: true,
				message: "Successfully added product to cart",
			};
		} else {
			this.productList.push({ product: product._id, quantity: 1 });
			await this.save();

			return {
				status: true,
				message: "Successfully added product to cart",
			};
		}
	} catch (error: any) {
		return { status: false, message: error.message };
	}
};

cartSchema.methods.removeItem = async function (
	productName: string
): Promise<{ status: boolean; message: string }> {
	try {
		const product = await Product.findOne({
			store: this.store,
			name: productName,
		});
		if (!product) return { status: false, message: "Product not found" };

		const cart = await cartModel.findOneAndUpdate(
			{ _id: this._id, "productList.product": product._id },
			{ $inc: { "productList.$.quantity": -1 } },
			{ new: true }
		);

		const item = cart?.productList.find((item) => item.quantity === 0);
		if (item) {
			await cartModel.updateOne(
				{ _id: this._id },
				{ $pull: { productList: { _id: item._id } } }
			);
		}

		return { status: true, message: "Successfully reduced quantity" };
	} catch (error: any) {
		return { status: false, message: error.message };
	}
};

cartSchema.methods.updateItemPrice = async function (
	product: IProduct
): Promise<number | { status: boolean; message: string }> {
	try {
		const itemQuantity = this.productList.find(
			(item: { product: Types.ObjectId; quantity: number }) =>
				item.product.equals(product._id as Types.ObjectId)
		).quantity;

		const itemTotal = product.discountPrice * itemQuantity;

		await cartModel.updateOne(
			{ _id: this._id },
			{ $set: { "productList.$[item].itemTotal": itemTotal } },
			{ arrayFilters: [{ "item.product": product._id }] }
		);

		return itemTotal;
	} catch (error: any) {
		return { status: false, message: error.message };
	}
};

cartSchema.methods.updateCartPrices = async function (): Promise<{
	status: boolean;
	message: string;
}> {
	try {
		let cartTotal = 0;

		for (const item of this.productList) {
			const product = await Product.findById(item.product);
			if (!product)
				return { status: false, message: "Product not found" };

			const itemTotal = await this.updateItemPrice(product);

			if (typeof itemTotal === "object" && itemTotal.status === false)
				return {
					status: false,
					message: `Failed to get item total. ${itemTotal.message}`,
				};
			else cartTotal += itemTotal as number;
		}

		this.cartTotal = cartTotal;
		await this.save();

		return {
			status: true,
			message: "Successfully updated cart total",
		};
	} catch (error: any) {
		return { status: false, message: error.message };
	}
};

const cartModel: Model<ICart> = mongoose.model("Cart", cartSchema);

export default cartModel;
