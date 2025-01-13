require("dotenv").config();
import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import storeRouter from "./routes/store.route";
import userRouter from "./routes/user.route";

export const app: Express = express();

//body parser
app.use(express.json({ limit: "50mb" }));

//cookie parser
app.use(cookieParser());

//cors
app.use(
	cors({
		origin: process.env.ORIGIN,
	})
);

// Store API
app.use("/api/", storeRouter, userRouter);

//Test API
app.get("/", (req: Request, res: Response, next: NextFunction) => {
	res.status(200).json({
		status: true,
		message: "API Successful",
	});
});

//Unknown Route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
	const err = new Error(`Route ${req.originalUrl} not found`) as any;
	err.statusCode = 404;
	next(err);
});

app.use(ErrorMiddleware);
