import express, { Request, Response } from "express";
import {
	getStoreDetails,
	addProduct,
	removeProduct,
	getCartDetails,
	addStore,
	saveStore,
	createProduct,
	searchStore,
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

storeRouter.get("/store/search", isAuthenticated, searchStore);
/* Response Body: JSON
"storeDetails":
	[{
		"name": string,
		"address": string,
		"location": string,
	}] */

storeRouter.get(
	"/store/:storeName",
	isAuthenticated,
	saveStore,
	getStoreDetails
);
/* Response Body: JSON 
"store": 
{
	"name": string,
	"image": string,
	"address": string,
	"location": string,
} */

storeRouter.post(
	"/store/:storeName/add-product",
	isAuthenticated,
	saveStore,
	addProduct
);
/* Request Body: JSON { "productName": string } */

storeRouter.post(
	"/store/:storeName/remove-product",
	isAuthenticated,
	saveStore,
	removeProduct
);
/* Request Body: JSON { "productName": string } */

storeRouter.get(
	"/store/:storeName/cart",
	isAuthenticated,
	saveStore,
	getCartDetails
);
/* Response Body: JSON 
{
"productList": 
	[{
		"product": string,
		"quantity": number,
		"itemTotal": number
	}],
"cartTotal": number
} */

storeRouter.post(
	"/store/:storeName/create-product",
	isAuthenticated,
	saveStore,
	createProduct
);
/* Request Body: JSON 
{
	"name": string,
	"mrp": string,
	"store": string,
	"image": string
} */

export default storeRouter;
