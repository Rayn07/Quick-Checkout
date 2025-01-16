import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import userModel from "../models/user.model";

export const isAuthenticated = CatchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const accessToken = req.cookies.access_token;
			if (!accessToken) {
				return next(
					new ErrorHandler(
						"Please login to access this resource",
						401
					)
				);
			}
			const decoded = jwt.verify(
				accessToken,
				process.env.ACCESS_TOKEN || ""
			) as JwtPayload;
			if (!decoded) {
				return next(new ErrorHandler("Access token is not valid", 401));
			}
			const user = await userModel.findById(decoded.id);
			if (!user) {
				return next(new ErrorHandler("User not found", 401));
			}
			req.user = user;
			next();
		} catch (error: any) {
			return next(new ErrorHandler("Authentication failed", 401));
		}
	}
);
