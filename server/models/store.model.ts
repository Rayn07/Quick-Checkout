import mongoose, { Document, Model, Schema } from "mongoose";

export interface IStore extends Document {
	name: string;
	address: string;
	location: string;
	image: string;
}

const storeSchema: Schema<IStore> = new Schema(
	{
		name: { type: String, required: true },
		address: { type: String, required: true },
		location: { type: String },
		image: { type: String },
	},
	{ timestamps: true }
);

const storeModel: Model<IStore> = mongoose.model("Store", storeSchema);

export default storeModel;
