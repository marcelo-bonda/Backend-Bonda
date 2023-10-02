class ProductManager {
    constructor (){
        this.products =[]
    }
    static id= 0
    
    addProduct(title, description, price, image, code , stock){
        ProductManager.id++
        this.products.push({title, description, price, image, code , stock, id:ProductManager.id});
    }
    getProduct(){
        return this.products;
    }
    exist (id){
        return this.products.find((product)=>product.id ===id)
    }

    getProductById(id){
        !this.exist(id)? console.log('not found') : console.log(this.exist(id))
    }
}

const product = new ProductManager

//console.log(product.getProduct())

product.addProduct('royal canin','alimento balanceado adulto medio', '$30000', 'imagen1', '1',3)
product.addProduct('royal canin','alimento balanceado adulto raza grande', '$31000', 'imagen1', '1',3)


product.getProductById(5)