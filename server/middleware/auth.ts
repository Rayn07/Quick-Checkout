import { Request, Response, NextFunction, CookieOptions } from "express";
import { CatchAsyncError } from "./catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import userModel from "../models/user.model";

const accessTokenOptions: CookieOptions = {
	expires: new Date(Date.now() + 5 * 60 * 1000),
	maxAge: 5 * 60 * 1000,
	httpOnly: true,
	sameSite: "lax",
};

const refreshTokenOptions: CookieOptions = {
	expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
	maxAge: 7 * 24 * 60 * 60 * 1000,
	httpOnly: true,
	sameSite: "lax",
};

const generateNewAccessToken = async (refreshToken: string): Promise<string | null> => {
	try {
		const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN || "") as JwtPayload;
		const user = await userModel.findById(decoded.id);
		if (!user) return null;
		return user.SignAccessToken();
	} catch (error) {
		return null;
	}
};

export const isAuthenticated = CatchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const accessToken = req.cookies.access_token;
		const refreshToken = req.cookies.refresh_token;

		if (!accessToken && !refreshToken) {
			return next(new ErrorHandler("Please login to access this resource", 401));
		}

		try {
			if (accessToken) {
				try {
					const decoded = jwt.verify(
						accessToken,
						process.env.ACCESS_TOKEN || ""
					) as JwtPayload;
					const user = await userModel.findById(decoded.id);
					if (!user) {
						return next(new ErrorHandler("User not found", 401));
					}
					req.user = user;
					return next();
				} catch (error) {
					// If access token is expired, try refresh flow
					if (error instanceof TokenExpiredError && refreshToken) {
						const newAccessToken = await generateNewAccessToken(refreshToken);
						if (!newAccessToken) {
							return next(
								new ErrorHandler("Session expired. Please login again", 401)
							);
						}

						res.cookie("access_token", newAccessToken, accessTokenOptions);

						const decoded = jwt.verify(
							newAccessToken,
							process.env.ACCESS_TOKEN || ""
						) as JwtPayload;
						const user = await userModel.findById(decoded.id);
						if (!user) {
							return next(new ErrorHandler("User not found", 401));
						}
						req.user = user;
						return next();
					}
					throw error;
				}
			}

			// If no access token but has refresh token
			if (refreshToken) {
				const newAccessToken = await generateNewAccessToken(refreshToken);
				if (!newAccessToken) {
					return next(new ErrorHandler("Invalid refresh token", 401));
				}

				res.cookie("access_token", newAccessToken, accessTokenOptions);

				const decoded = jwt.verify(
					newAccessToken,
					process.env.ACCESS_TOKEN || ""
				) as JwtPayload;
				const user = await userModel.findById(decoded.id);
				if (!user) {
					return next(new ErrorHandler("User not found", 401));
				}
				req.user = user;
				return next();
			}
		} catch (error) {
			if (error instanceof TokenExpiredError) {
				return next(new ErrorHandler("Token expired. Please login again", 401));
			}
			return next(new ErrorHandler("Authentication failed", 401));
		}
	}
);
