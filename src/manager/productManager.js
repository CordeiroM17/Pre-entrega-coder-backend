import fs from "fs"
const createJsonFile = async () => {
  if (!fs.existsSync("src/db/products.json")) {
    return await fs.promises.writeFile("src/db/products.json", "[]");
  }
};

createJsonFile();

export class ProductManager {
  constructor() {
    this.path = "src/db/products.json";
    this.products = [];
    this.id = 0;
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    const productFile = await fs.promises.readFile(this.path, "utf-8");
    const products = JSON.parse(productFile);
    this.products = products;
    this.id = parseInt(Math.random() * 1000000 + 7);

    const codeError = this.products.find((prod) => prod.code == code);

    if (codeError || title == "" || description == "" || price == "" || thumbnail == "" || code == "" || stock == "") {
      console.log("Error code, existing code");
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

  async getProducts() {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);
    return fileProductsParse
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

  /* 
  <----------------ARREGLAR ENTRA EN BUCLE INFINITO--------->
  async updateProduct(id, prop, newValor) {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);

    const findProd = fileProductsParse.find((prod) => prod.id == id);

    if (findProd == undefined) {
      console.log("Product not found");
    } else {
      findProd[prop] = newValor;
      const productsString = JSON.stringify(fileProductsParse);
      BUCLE INFINITO ACA
      await fs.promises.writeFile(this.path, productsString);
    }
  } */

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

/* let productmanager = new ProductManager() */



/* console.log(productmanager.generarId())
console.log(productmanager.generarId())
console.log(productmanager.generarId()) */
