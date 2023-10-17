const express = require('express');
const {ProductManager,productManager} = require('../desafio2/ProductManager'); 

productManager.addProduct('producto de prueba','esto es un producto de prueba',200,'sin imagen','abc123',25)

console.log(productManager.getProducts())


const app = express();
const port = 8080; 




app.use(express.json());

// Endpoint para obtener todos los productos con opción de límite
app.get('/products', async (req, res) => {
const { limit } = req.query;
const products = await productManager.getProducts();

if (limit) {
const limitedProducts = products.slice(0, parseInt(limit));
res.json(limitedProducts);
} else {
res.json(products);
}
});

// Endpoint para obtener un producto por su ID
app.get('/products/:pid', async (req, res) => {
const { pid } = req.params;
const products = await productManager.getProducts();
const product = products.find(p => p.id === parseInt(pid));

if (product) {
res.json(product);
} else {
res.status(404).json({ error: 'Producto no encontrado' });
}
});

app.get('/bienvenida', (req,res)=>{
    res.send('esto funciona')
})

app.listen(port, () => {
console.log(`Servidor Express corriendo en el puerto ${port}`);
});
