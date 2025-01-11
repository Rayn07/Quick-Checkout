import express, { Request, Response } from "express";
import {
	getStoreDetails,
	addProduct,
	removeProduct,
	getCartDetails,
	addStore,
	getStoreAndUser,
} from "../controllers/store.controller";
import { isAuthenticated } from "../middleware/auth";
const storeRouter = express.Router();

storeRouter.get("/store", isAuthenticated, (req: Request, res: Response) => {
	res.send("In Store Router");
});

storeRouter.post("/store/add-store", isAuthenticated, addStore);
/* Request Body: JSON 
{
"name": string,
"address": string,
"location": string,
"image": string
} */

storeRouter.get(
	"/store/:storeName",
	isAuthenticated,
	getStoreAndUser,
	getStoreDetails
);
/* Response Body: JSON 
{
"name": string,
"image": string,
"address": string,
"location": string,
} */

storeRouter.post(
	"/store/:storeName/add-product",
	isAuthenticated,
	getStoreAndUser,
	addProduct
);
/* Request Body: JSON { "productName": string } */

storeRouter.post(
	"/store/:storeName/remove-product",
	isAuthenticated,
	getStoreAndUser,
	removeProduct
);
/* Request Body: JSON { "productName": string } */

storeRouter.get(
	"/store/:storeName/cart",
	isAuthenticated,
	getStoreAndUser,
	getCartDetails
);
/* Response Body: JSON 
{
"productList": 
	[{
		"product": string,
		"quantity": number,
		"price": number
	}],
"totalPrice": number
} */

export default storeRouter;
