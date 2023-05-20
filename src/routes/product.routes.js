import express from "express";
import { ProductManager } from "../manager/productManager.js";
const productManager = new ProductManager();
export const productsRoute = express.Router();

productsRoute.get("/", async (req, res) => {
    const allProducts = await productManager.getProducts();

    let limit = req.query.limit;
    if (!limit) {
        return res.json({
        products: allProducts
        });
    }else if (limit > 0 && limit <= allProducts.length) {
        let productsLimit = allProducts.slice(0, limit);
        return res.json({ data: productsLimit });
    }else if (limit > allProducts.length) {
        return res.json({
        status: "error",
        msg: "Exceed the limit of products",
        });
    }

    return res.status(200).json({ 
      status: "Success", 
      msg: "All products",
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

productsRoute.post("/", async (req, res) => {
    const productToCreate = req.body;
    await productManager.addProduct(productToCreate)
    
    return res.status(201).json({
      status: "success",
      msg: "Product create",
      data: productToCreate,
    });
});

productsRoute.put("/:id", async (req, res) => {
    const id = req.params.id;
    const newProduct = req.body;
    const productCreate = await productManager.updateProduct(id, newProduct)

    if (productCreate) {
        return res.status(201).json({
            status: "success",
            msg: "successfully modified product",
            data: newProduct,
        });
    } else {
        return res.status(201).json({
            status: "error",
            msg: "could not modify object",
            data: {},
        });
    }
  });