const fs = require('fs').promises;

class ProductManager {
  constructor(path) {
    this.path = 'productList'
    this.products = [];
    this.loadProducts();
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {

      this.products = [];
    }
  }

  async saveProducts() {
    try {
      await fs.writeFile(this.path, JSON.stringify(this.products), 'utf-8');
    } catch (error) {
      console.error(`Error al guardar los productos: ${error.message}`);
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Todos los campos son obligatorios");
      return;
    }


    const newProduct = {
      id: this.products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);


    await this.saveProducts();

    console.log('Producto agregado');
  }

  async updateProduct(id, updatedProduct) {
    
    const index = this.products.findIndex(product => product.id === id);

    if (index === -1) {
      console.error(`Producto con ID ${id} no encontrado`);
      return;
    }

    
    this.products[index] = {
        ...this.products[index],
        ...updatedProduct,
        id, 
    };

    
    await this.saveProducts();

    console.log('Producto actualizado');
}

    async deleteProduct(id) {
    
    this.products = this.products.filter(product => product.id !== id);


    await this.saveProducts();

    console.log('Producto eliminado');
}

getProducts() {
    return this.products;
}
}



const productManager = new ProductManager

productManager.addProduct('producto de prueba','esto es un producto de prueba',200,'sin imagen','abc123',25)

console.log('productos añadidos', productManager.getProducts());

