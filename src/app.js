import express from "express";
import { productsRoute } from "./routes/product.routes.js";
import { cartsRoute } from "./routes/carts.routes.js"
const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.status(200).json({
    status: "Success", 
    msg: "Json connected",
  });
});

/* ENDPOINTS */
app.use("/api/products", productsRoute);
app.use("/api/carts", cartsRoute);

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "Page not found",
    data: {},
  });
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});