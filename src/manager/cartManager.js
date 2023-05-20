import fs from "fs"
const createJsonFile = async () => {
  if (!fs.existsSync("src/db/carts.json")) {
    return await fs.promises.writeFile("src/db/carts.json", "[]");
  }
};

createJsonFile();

import { ProductManager } from "./productManager.js";
const productManager = new ProductManager();

export class CartManager {
    constructor() {
        this.pathCarts = "src/db/carts.json";
        this.pathProduct = "src/db/products.json";
        this.carts = [];
        this.id = 0;
    };

    async createCart(id) {
        console.log("el carrito no existe");
        const newCart = {
            idCarrito: id,
            productos: []
        }
        this.carts.push(newCart)
        let newCartsString = JSON.stringify(this.carts);
        fs.writeFileSync(this.pathCarts, newCartsString);
    }

    async addItemToCart(cartId, productId) {
        const fileCarts = await fs.promises.readFile(this.pathCarts, "utf-8")
        const fileCartsParse = JSON.parse(fileCarts);
        this.carts = fileCartsParse;

        const allProducts = await productManager.getProducts();
        const productFound = allProducts.find((product) => product.id === productId);

        if (productFound) {
            console.log("el producto existe")
            const findCart = fileCartsParse.find((cart) => cart.idCarrito == cartId);
            
            if (findCart) {
                console.log("el carrito existe")
                const foundProductInCart = findCart.productos.find((product) => product.idProduct === productId);

                if (foundProductInCart) {
                    console.log("el producto ",foundProductInCart.idProduct, " esta en el carrito ", findCart.idCarrito)
                    foundProductInCart.quantity++;
    
                    let cartsString = JSON.stringify(this.carts);
                    fs.writeFileSync(this.pathCarts, cartsString);
                } else {
                    console.log("el producto no esta en el carrito, entonces lo agrego")
                    const products = {
                        idProduct: productId,
                        quantity: 1,
                    }
                    
                    findCart.productos.push(products)
                    let cartsString = JSON.stringify(this.carts);
                    fs.writeFileSync(this.pathCarts, cartsString);
                }
            } else {
                this.createCart(cartId)
            }
        }
    }
}