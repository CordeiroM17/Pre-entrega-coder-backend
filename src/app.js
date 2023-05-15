import express from "express";
import { productsRoute } from "./routes/product.routes.js";
const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.status(200).json({
    status: "Success", 
    msg: "Json conectados",
  });
});

app.use("/api/products", productsRoute);

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "error esa ruta no existe",
    data: {},
  });
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});