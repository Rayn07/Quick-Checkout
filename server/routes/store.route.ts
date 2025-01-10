import express from "express";
import {
	getStore,
	addProduct,
	removeProduct,
	getCart,
} from "../controllers/store.controller";
import { isAutheticated } from "../middleware/auth";
const storeRouter = express.Router();

storeRouter.get("/:storeName", isAutheticated, getStore);
/* Response Body: JSON 
{
"name": string,
"image": string,
"address": string,
"location": string,
} */

storeRouter.post("/:storeName/addProduct", isAutheticated, addProduct);
/* Request Body: JSON { "productName": string } */

storeRouter.post("/:storeName/removeProduct", isAutheticated, removeProduct);
/* Request Body: JSON { "productName": string } */

storeRouter.get("/:storeName/Cart", isAutheticated, getCart);
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
