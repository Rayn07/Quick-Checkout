import { NextFunction, Request, Response } from "express";

export const ErrorMiddleware = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	err.statusCode = err.statusCode || 500;
	err.message = err.message || "Internal server error";

	res.status(err.statusCode).json({
		status: false,
		message: err.message,
	});
};
