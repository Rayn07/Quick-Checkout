import express, { Request, Response } from "express";
import { isAuthenticated } from "../middleware/auth";
import {
	registerUser,
	loginUser,
	logoutUser,
} from "../controllers/user.controller";
const userRouter = express.Router();

userRouter.get("/user", isAuthenticated, (req: Request, res: Response) => {
	res.status(200).json({ status: true, user: req.user });
});

userRouter.post("/user/register", registerUser);
/* Request Body: JSON 
{
	"name": string,
	"email": string,
	"password": string,
} */

userRouter.post("/user/login", loginUser);
/* Request Body: JSON
{
	"email": string,
	"password": string,
} */

userRouter.get("/user/logout", isAuthenticated, logoutUser);
/* Response Body: JSON
{
	"status": boolean,
	"message": string,
} */

export default userRouter;
