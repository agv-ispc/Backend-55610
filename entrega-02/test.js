const ProductManager = require('./productManager.js');

async function testProductManager() {
  const productManager = new ProductManager("./products.json");
  console.log("Agregamos productos...")
  // Probamos el método addProduct
  await productManager.addProduct("Producto 1", "Descripción 1", 100, "url1", "codigo1", 10);
  await productManager.addProduct("Producto 2", "Descripción 2", 200, "url2", "codigo2", 20);
  await productManager.addProduct("Producto 3", "Descripción 3", 300, "url3", "codigo3", 30);

  console.log("Test de obtencion de la lista de producto")
  // Probamos el método getProducts
  const products = await productManager.getProducts();
  console.log(products); // Debería mostrar los tres productos que agregamos

  console.log("Test de obtencion de producto por ID")
  // Probamos el método getProductbyId
  const product1 = await productManager.getProductbyId(1);
  console.log(product1); // Debería mostrar el producto con ID 1

  console.log("Test de actualizacion de producto por ID")
  // Probamos el método updateProduct
  await productManager.updateProduct(1, "Producto 1 actualizado", "Descripción 1 actualizada", 150, "url1actualizada", "codigo1actualizado", 15);

  // Verificamos que el producto se haya actualizado correctamente
  const updatedProduct1 = await productManager.getProductbyId(2);
  console.log(updatedProduct1); // Debería mostrar el producto con ID 1 actualizado
  
  console.log("Test de eliminacion de producto por ID")
  // Probamos el método deleteProduct
  await productManager.deleteProduct(2);
  
  // Verificamos que el producto se haya eliminado correctamente
  
  const deletedProduct1 = await productManager.getProductbyId(2);
  console.log(deletedProduct1); // Debería mostrar undefined o null, ya que el producto con ID 1 ya no existe
}

testProductManager()