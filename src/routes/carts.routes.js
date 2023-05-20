import express from "express";
import { CartManager } from "../manager/cartManager.js";
const cartManager = new CartManager();

export const cartsRoute = express.Router();

cartsRoute.get("/:cid", async (req, res) => {

});

cartsRoute.post("/:cid/product/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid
    const productAddToCart = await cartManager.addItemToCart(cartId, productId);

    if (productAddToCart) {
        return res.status(201).json({
            status: "success",
            msg: "Product added",
            data: productAddToCart,
        })
    } else {
        return res.status(201).json({
            status: "error",
            msg: "Product not added",
            data: {},
        }) 
    }
});