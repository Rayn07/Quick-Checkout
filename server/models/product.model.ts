import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IProduct extends Document {
	name: string;
	mrp: number;
	store: Types.ObjectId;
	discountPrice: number;
	image: string;
}

const productSchema: Schema<IProduct> = new Schema(
	{
		name: { type: String, required: true },
		mrp: { type: Number, required: true },
		store: { type: Schema.Types.ObjectId, ref: "Store" },
		discountPrice: { type: Number },
		image: { type: String },
	},
	{ timestamps: true }
);

productSchema.pre<IProduct>("save", function (next) {
	this.discountPrice = this.mrp;
	next();
});

const productModel: Model<IProduct> = mongoose.model("Product", productSchema);

export default productModel;
