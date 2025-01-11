import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncError";

//dummy middleware
export const isAuthenticated = CatchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		next();
	}
);
