class ProductManager {
    constructor() {
        this.product = [];
    }

    #generarId() {
        let maxId = 0;
        for (let i = 0; i < this.product.length; i++) {
            const e = this.product[i];
            if (e.id > maxId) {
                maxId = e.id;
            }
        } return maxId++
    }

    getProducts() {
        if (this.product.length === 0) {
            console.log([]);
        } else {
            console.log(this.product);
        }
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        let id = this.#generarId();
        let newProduct = {title, description, price, thumbnail, code, stock, id};
        let exist = this.product.find((e) => e.code == newProduct.code);
        if (exist) {
            console.log("The product already exists");
        } else {
            this.product = [...this.product, newProduct];
            console.log("Added successfully", this.product);
        }
    }

    getProductById(id) {
        const find = this.product.find((e) => e.id == id);
        find ? console.log(find) : console.log("Not found");
    }
}

/* Ejecucion segun lo pedido en la consigna */

productManager = new ProductManager();
productManager.getProducts();
productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", 123, 25);
productManager.getProducts();
productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", 123, 25);
productManager.getProductById(0);
productManager.getProductById(10);