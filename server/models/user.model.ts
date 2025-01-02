require("dotenv").config();
import mongoose, { Document, Model, Schema, Types } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	purchases: Array<Types.ObjectId>;
	cart: {
		store: Types.ObjectId;
		items: Array<Types.ObjectId>;
	};
	comparePassword: (password: string) => Promise<boolean>;
	SignAccessToken: () => string;
	SignRefreshToken: () => string;
}

const userSchema: Schema<IUser> = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			validate: {
				validator: function (value: string) {
					return emailRegexPattern.test(value);
				},
			},
			unique: true,
		},
		password: {
			type: String,
			minlength: 6,
			select: false,
		},
		purchases: [{ type: Schema.Types.ObjectId, ref: "Purchase" }],
		cart: {
			store: { type: Schema.Types.ObjectId, ref: "Store" },
			items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
		},
	},
	{ timestamps: true }
);

// Hash Password before saving
userSchema.pre<IUser>("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

// sign access token
userSchema.methods.SignAccessToken = function () {
	return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || "", {
		expiresIn: "5m",
	});
};

// sign refresh token
userSchema.methods.SignRefreshToken = function () {
	return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || "", {
		expiresIn: "3d",
	});
};

// compare password
userSchema.methods.comparePassword = async function (
	enteredPassword: string
): Promise<boolean> {
	return await bcrypt.compare(enteredPassword, this.password);
};

const userModel: Model<IUser> = mongoose.model("User", userSchema);

export default userModel;
