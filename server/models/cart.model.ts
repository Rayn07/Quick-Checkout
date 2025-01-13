import mongoose, { Document, Model, Schema, Types } from "mongoose";
import Product from "./product.model";

export interface ICart extends Document {
	user: Types.ObjectId;
	store: Types.ObjectId;
	productList: Array<{
		product: Types.ObjectId;
		quantity: number;
		itemTotal: number;
	}>;
	cartTotal: number;
	addToCart: (
		productName: string
	) => Promise<{ status: boolean; message: string }>;
	reduceQuantity: (
		productName: string
	) => Promise<{ status: boolean; message: string }>;
	updateItemPrice: (
		productName: string
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

cartSchema.methods.addToCart = async function (
	productName: string
): Promise<{ status: boolean; message: string }> {
	try {
		const product = await Product.findOne({
			store: this.store,
			name: productName,
		});
		if (!product) return { status: false, message: "Product not found" };

		const productExists = await this.productList.exists({
			product: product._id,
		});
		if (productExists) {
			await this.productList.updateOne(
				{ product: product._id },
				{ $inc: { quantity: 1 } }
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

cartSchema.methods.reduceQuantity = async function (
	productName: string
): Promise<{ status: boolean; message: string }> {
	try {
		const product = await Product.findOne({
			store: this.store,
			name: productName,
		});
		if (!product) return { status: false, message: "Product not found" };

		await this.productList.updateOne(
			{ product: product._id },
			{ $inc: { quantity: -1 } }
		);
		return { status: true, message: "Successfully reduced quantity" };
	} catch (error: any) {
		return { status: false, message: error.message };
	}
};

cartSchema.methods.updateItemPrice = async function (
	productName: string
): Promise<number | { status: boolean; message: string }> {
	try {
		const product = await Product.findOne({
			store: this.store,
			name: productName,
		});
		if (!product) return { status: false, message: "Product not found" };

		const itemQuantity = await this.productList.find(
			(item: { product: Types.ObjectId; quantity: number }) =>
				item.product === product._id
		).quantity;

		const itemTotal = product.discountPrice * itemQuantity;

		await this.productList.updateOne(
			{ product: product._id },
			{ itemTotal }
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

			const itemTotal = await this.updateItemPrice(product.name);
			if (typeof itemTotal === "object" && itemTotal.status === false)
				return { status: false, message: "Failed to get item total" };
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
