import express from "express";
import { ProductManager } from "../manager/productManager.js";
const productManager = new ProductManager();
export const productsRoute = express.Router();

productsRoute.get("/", async (req, res) => {
    const allProducts = await productManager.getProducts();
    return res.status(200).json({ 
      status: "Success", 
      msg: "Todos los productos",
      data: allProducts
    });
});
  
productsRoute.get("/:pid", async (req, res) => {
    const allProducts = await productManager.getProducts();
    let productId = req.params.pid;
    let productFound = allProducts.find((product) => product.id === productId);
    if (!productFound) {
        return res.status(404).json({ status: "Error", data: "Product ID not found" });
    }
    res.status(200).json({ status: "success", data: productFound });
});

productsRoute.delete("/:id", (req, res) => {
    const id = req.params.id;
    productManager.deleteProduct(id)
  });