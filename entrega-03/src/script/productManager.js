const fs = require("fs")
// Definimos la clase ProductManager
class ProductManager {
  // Constructor de la clase
  constructor(path) {
    this.path = path; //Recibe un argumento 'path', que es la ruta al archivo donde se almacenan los productos.
    // Intentamos leer el archivo, si el archivo existe y su contenido es un JSON válido, lo parseamos a un objeto.
    try {
      let products = fs.readFileSync(this.path, "utf-8");
      this.products = JSON.parse(products);
    } catch {
      // Si hay un error, inicializamos products como un array vacío
      this.products = [];
    }
  }
  // Método para agregar un nuevo producto.
  addProduct = async (title, description, price, thumbnail, code, stock) => {
    // Verificamos que todos los campos estén presentes.
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("UNO O MAS CAMPOS ESTAN VACIOS \n TODOS LOS DATOS SON OBLIGATORIOS")
      return
    }
    else {
      // Verificamos que el código del producto no esté repetido.
      const repeted_code = this.products.find(element => element.code === code)
      if (repeted_code) {
        console.error("EL CODIGO INGRESADO YA EXISTE")
        return
      }
      else {
        // Si todos los argumentos están presentes y el código del producto no está repetido, procedemos a crear el nuevo producto.
        // Generamos un nuevo ID para el producto.
        const id = await this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1
        // Creamos el nuevo producto.
        const new_product = {
          id, title, description, price, thumbnail, code, stock
        }
        // Agregamos el nuevo producto a la lista de productos.
        this.products.push(new_product)
        // Convertimos el array a una cadena en formato JSON.
        // Guardamos la lista de productos en el archivo.
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
      }
    }
  }
  // Método para obtener la lista de productos desde un archivo.
  async getProducts() {
    try {
      return this.products
    }
    catch (error) {
      console.log(error);
    }
  }
  // Método para actualizar un producto existente
  updateProduct = async (id, title, description, price, thumbnail, code, stock) => {
    // Verificamos que todos los campos estén presentes.
    if (!id || !title || !description || !price || !thumbnail || !code || !stock) {
      console.error("UNO O MAS CAMPOS ESTAN VACIOS \n TODOS LOS DATOS SON OBLIGATORIOS")
      return
    }
    else {// Verificamos que el código del producto no esté repetido.
      const all_products = await this.getProducts()
      const repeted_code = all_products.find(elemento => elemento.code === code)
      if (repeted_code) {
        console.error("EL CODIGO INGRESADO YA EXISTE")
        return
      }
      else {// Verificamos que el ID del producto no esté repetido.
        const currentProductsList = await this.getProducts()
        const new_products_list = currentProductsList.map(element => {
          if (element.id === id) {
            const updatedProduct = {
              ...element,
              title, description, price, thumbnail, code, stock
            }
            return updatedProduct
          }
          else {
            return element
          }
        })
        // Convertimos el array a una cadena en formato JSON.
        // Guardamos la nueva lista de productos en el archivo.
        await fs.promises.writeFile(this.path, JSON.stringify(new_products_list, null, 2))
      }
    }
  }
  // Método para eliminar un producto
  deleteProduct = async (id) => {
    const all_products = await this.getProducts()
    // Creamos una nueva lista de productos que excluye el producto con el ID dado.
    const products_not_found = all_products.filter(element => element.id !== id)
    // Convertimos la lista a una cadena en formato JSON.
    // Guardamos la nueva lista de productos en el archivo.
    await fs.promises.writeFile(this.path, JSON.stringify(products_not_found, null, 2))
  }
  // Método para obtener un producto por su ID
  getProductbyId = async (id) => {
    // Buscamos el producto con el ID dado en la lista de productos.
    const found = this.products.find(element => element.id === id)
    // Devolvemos el producto encontrado.
    return found
  }
}

module.exports = ProductManager;
// ----------------------Test--------------------------------
/* async function testProductManager() {
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
  const updatedProduct1 = await productManager.getProductbyId(1);
  console.log(updatedProduct1); // Debería mostrar el producto con ID 1 actualizado

  console.log("Test de eliminacion de producto por ID")
  // Probamos el método deleteProduct
  await productManager.deleteProduct(2);

  // Verificamos que el producto se haya eliminado correctamente

  const deletedProduct1 = await productManager.getProductbyId(2);
  console.log(deletedProduct1); // Debería mostrar undefined o null, ya que el producto con ID 1 ya no existe
}

testProductManager() */