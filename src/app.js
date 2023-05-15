const express = require('express')
const ProductManager = require('./productManager')
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
const productManager = new ProductManager();

app.get("/", async (req, res) => {
  res.json({status: "Success", msg: "Json conectados"})
})

app.get("/products", async (req, res) => {
  const allProducts = await productManager.getProducts();
  res.status(200).json({ 
    status: "Success", 
    msg: "Todos los productos",
    data: allProducts 
  });
});

app.get("/products/:pid", async (req, res) => {
  const allProducts = await productManager.getProducts();
  let productId = req.params.pid;
  let productFound = allProducts.find((product) => product.id === productId);
  if (!productFound) {
    return res.json({ status: "Error", data: "Product ID not found" });
  }
  res.status(200).json({ status: "success", data: productFound });
});

app.get("*", (req, res) => {
  res.json({ status: "error", data: "Page not found" });
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});