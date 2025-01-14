import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IPurchase extends Document {
	status: string;
	cart: Types.ObjectId;
}

const purchaseSchema: Schema<IPurchase> = new Schema(
	{
		status: { type: String, default: "Pending" },
		cart: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
	},
	{ timestamps: true }
);

const purchaseModel: Model<IPurchase> = mongoose.model(
	"Purchase",
	purchaseSchema
);

export default purchaseModel;
