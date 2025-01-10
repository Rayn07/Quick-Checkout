import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";

//dummy middleware
export const isAutheticated = CatchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		next();
	}
);
