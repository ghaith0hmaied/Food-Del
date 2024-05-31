import express from 'express';
import { addToCart,removeFromCart,getCart } from '../Controlers/cartControler.js';
import authMiddleware from '../Midleware/auth.js';
const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware,addToCart)
cartRouter.post("/remove",authMiddleware,removeFromCart)
cartRouter.post("/get",authMiddleware,getCart)


export default cartRouter;