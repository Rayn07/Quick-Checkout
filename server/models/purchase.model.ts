import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IPurchase extends Document {
	store: Types.ObjectId;
	date: Date;
	status: string;
	productList: Array<{
		product: Types.ObjectId;
		quantity: number;
		price: number;
	}>;
	totalPrice: number;
}

const purchaseSchema: Schema<IPurchase> = new Schema(
	{
		store: { type: Schema.Types.ObjectId, ref: "Store", required: true },
		status: { type: String, default: "Pending" },
		productList: [
			{
				product: { type: Schema.Types.ObjectId, ref: "Product" },
				quantity: { type: Number },
				price: { type: Number },
			},
		],
		totalPrice: { type: Number, required: true },
	},
	{ timestamps: true }
);

const purchaseModel: Model<IPurchase> = mongoose.model(
	"Purchase",
	purchaseSchema
);

export default purchaseModel;
