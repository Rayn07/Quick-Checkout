import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import userModel from "../models/user.model";

export const registerUser = CatchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userData = req.body;
			let user = new userModel(userData);
			user.save()
				.then((result) => {
					res.json({
						status: true,
						userData,
					});
				})
				.catch((error: any) => {
					return next(
						new ErrorHandler(
							`User Registration Failed. ${error.message}`,
							500
						)
					);
				});
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 500));
		}
	}
);
