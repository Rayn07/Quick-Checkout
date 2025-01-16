import { Request, Response, NextFunction } from "express";
import userModel, { IUser } from "../models/user.model";
import { CookieOptions } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncError";

declare global {
	namespace Express {
		interface Request {
			user?: IUser;
		}
	}
}

interface IRegistrationBody {
	name: string;
	email: string;
	password: string;
}

interface ILoginBody {
	email: string;
	password: string;
}

const accessTokenOptions: CookieOptions = {
	expires: new Date(Date.now() + 5 * 60 * 1000),
	maxAge: 5 * 60 * 1000,
	httpOnly: true,
	sameSite: "lax",
};

const refreshTokenOptions: CookieOptions = {
	expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
	maxAge: 3 * 24 * 60 * 60 * 1000,
	httpOnly: true,
	sameSite: "lax",
};

export const registerUser = CatchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { name, email, password } = req.body as IRegistrationBody;
			const existingUser = await userModel.findOne({ email });
			if (existingUser) {
				return next(new ErrorHandler("Email already exists", 400));
			}
			const user = await userModel.create({
				name,
				email,
				password,
			});
			const accessToken = user.SignAccessToken();
			const refreshToken = user.SignRefreshToken();
			res.cookie("access_token", accessToken, accessTokenOptions);
			res.cookie("refresh_token", refreshToken, refreshTokenOptions);
			res.status(201).json({
				status: true,
				user,
			});
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 500));
		}
	}
);

export const loginUser = CatchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { email, password } = req.body as ILoginBody;
			if (!email || !password) {
				return next(
					new ErrorHandler("Please enter email and password", 400)
				);
			}
			const user = await userModel.findOne({ email }).select("+password");
			if (!user) {
				return next(new ErrorHandler("Invalid credentials", 401));
			}
			const isPasswordValid = await user.comparePassword(password);
			if (!isPasswordValid) {
				return next(new ErrorHandler("Invalid credentials", 401));
			}
			const accessToken = user.SignAccessToken();
			const refreshToken = user.SignRefreshToken();
			res.cookie("access_token", accessToken, accessTokenOptions);
			res.cookie("refresh_token", refreshToken, refreshTokenOptions);
			res.status(200).json({
				status: true,
				user,
			});
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 500));
		}
	}
);

export const logoutUser = CatchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			res.cookie("access_token", "", { maxAge: 1 });
			res.cookie("refresh_token", "", { maxAge: 1 });
			res.status(200).json({
				status: true,
				message: "Logged out successfully",
			});
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 500));
		}
	}
);
