const fs = require("fs");

const createJsonFile = async () => {
  if (!fs.existsSync("products.json")) {
    return await fs.promises.writeFile("products.json", "[]");
  }
};

createJsonFile();

class ProductManager {
  constructor() {
    this.path = "products.json";
    this.products = [];
    this.id = 0;
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    const productFile = await fs.promises.readFile(this.path, "utf-8");
    const products = JSON.parse(productFile);
    this.products = products;

    const codeError = this.products.find((prod) => prod.code == code);

    if (codeError) {
      console.log("Error code, existing code");
    } else {
      this.id++;
      title = title || " ";
      description = description || " ";
      price = price || " ";
      thumbnail = thumbnail || " ";
      code = code || " ";
      stock = stock || " ";

      if (title == "" || description == "" || price == "" || thumbnail == "" || code == "" || stock == "") {
        console.log("Error: hay campos sin completar");
      } else {
        const product = {
          id: this.id,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };

        this.products.push(product);
        const productsString = JSON.stringify(this.products);
        await fs.promises.writeFile(this.path, productsString);
      }
    }
  }

  async getProducts() {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);
    console.log(fileProductsParse);
  }

  async getProductById(id) {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);
    const findProd = fileProductsParse.find((prod) => prod.id == id);

    if (findProd) {
      return console.log(findProd);
    } else {
      console.log("Product not found");
    }
  }

  async updateProduct(id, prop, newValor) {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);

    const findProd = fileProductsParse.find((prod) => prod.id == id);

    if (findProd == undefined) {
      console.log("Product not found");
    } else {
      findProd[prop] = newValor;
      const productsString = JSON.stringify(fileProductsParse);
      await fs.promises.writeFile(this.path, productsString);
    }
  }

  async deleteProduct(id) {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);

    const positionProduct = fileProductsParse.findIndex(
      (prod) => prod.id == id
    );

    if (positionProduct == -1) {
      console.log("Product not found");
    } else {
      delete fileProductsParse[positionProduct];
      const productsDelete = fileProductsParse.filter(
        (prod) => prod !== undefined
      );

      const productsString = JSON.stringify(productsDelete);
      await fs.promises.writeFile(this.path, productsString);
    }
  }
}

const prodManager = new ProductManager();

// Agrego 3 productos nuevos
prodManager.addProduct(
  "producto 1",
  "Este es un producto numero 1",
  2000,
  "Sin imagen",
  "abc123",
  100
);

prodManager.addProduct(
  "producto prueba 2",
  "Este es un producto numero 1",
  2000,
  "Sin imagen",
  "abc124",
  35
);

prodManager.addProduct(
  "producto prueba 3",
  "Este es un producto numero 1",
  2000,
  "Sin imagen",
  "abc125",
  75
);

// Obtengo todos los productos
console.log("Obtengo todos los productos");
prodManager.getProducts();

// Buscamos el producto con el ID 1
console.log("Busco producto por el ID");
prodManager.getProductById(1);

console.log("Updateo el producto numero con el id 1 y le pongo un nuevo nombre");
prodManager.updateProduct(1, "producto 1", "celular");
prodManager.getProductById(1);

console.log("Elimino el producto con ID 0");
prodManager.deleteProduct(0);


// Muestro todos los productos
console.log("Obtengo todos los productos");
prodManager.getProducts();