import express, { Request, Response } from "express";
import { registerUser } from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/auth";
const userRouter = express.Router();

userRouter.get("/user/", isAuthenticated, (req: Request, res: Response) => {
	res.send("In User Router");
});

userRouter.post("/user/register", registerUser);
/* Request Body: JSON 
{
"name": string,
"email": string,
"password": string,
} */

export default userRouter;
