import mongoose, { Document, Model, Schema, Types } from "mongoose";
import Product from "./product.model";

export interface ICart extends Document {
	user: Types.ObjectId;
	store: Types.ObjectId;
	productList: Array<{ product: Types.ObjectId; quantity: number }>;
	addToCart: (productName: string) => Promise<boolean>;
	reduceQuantity: (productName: string) => Promise<boolean>;
	getItemTotal: (productName: string) => Promise<number>;
	getCartTotal: () => Promise<number>;
}

const cartSchema: Schema<ICart> = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		store: { type: Schema.Types.ObjectId, ref: "Store", required: true },
		productList: [
			{
				product: { type: Schema.Types.ObjectId, ref: "Product" },
				quantity: { type: Number },
			},
		],
	},
	{ timestamps: true }
);

cartSchema.methods.addToCart = async function (
	productName: string
): Promise<boolean> {
	try {
		const product = await Product.findOne({
			store: this.store,
			name: productName,
		});
		if (!product) return false;

		this.productList.exists({ product: product._id }).then(() => {
			this.productList.updateOne(
				{ product: product._id },
				{ $inc: { quantity: 1 } }
			);
			return true;
		});

		this.productList.push({ product: product._id, quantity: 1 });
		return true;
	} catch (error) {
		return false;
	}
};

cartSchema.methods.reduceQuantity = async function (
	productName: string
): Promise<boolean> {
	try {
		const product = await Product.findOne({
			store: this.store,
			name: productName,
		});
		if (!product) return false;

		this.productList.updateOne(
			{ product: product._id },
			{ $inc: { quantity: -1 } }
		);
		return true;
	} catch (error) {
		return false;
	}
};

cartSchema.methods.getItemTotal = async function (
	productName: string
): Promise<number> {
	try {
		const product = await Product.findOne({
			store: this.store,
			name: productName,
		});
		if (!product) return -1;

		const itemQuantity = this.productList.find(
			(item: { product: Types.ObjectId; quantity: number }) =>
				item.product === product._id
		).quantity;

		return product.discountPrice * itemQuantity;
	} catch (error) {
		return -1;
	}
};

cartSchema.methods.getCartTotal = async function (): Promise<number> {
	try {
		let total = 0;
		for (const item of this.productList) {
			const product = await Product.findById(item.product);
			if (!product) return -1;

			const itemTotal = await this.getItemTotal(product.name);
			if (itemTotal === -1) return -1;
			else total += itemTotal;
		}
		return total;
	} catch (error) {
		return -1;
	}
};

const cartModel: Model<ICart> = mongoose.model("Cart", cartSchema);

export default cartModel;
