import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js'
const socket = io()

const form = document.querySelector("form")
const productsList = document.getElementById("products-list");

// Escuchar el evento "productList" desde el servidor
socket.on('products list', (products) => {
  console.log(products)

  productsList.innerHTML = '';
  // Obtener la lista de productos del DOM
    products.forEach((product) => {
      // Crear un elemento de lista y establecer su contenido
      const listItem = document.createElement("li");
      listItem.innerHTML = `${product.title} - Price: ${product.price}`;
  
      // Agregar el elemento de lista a la lista en el DOM
      productsList.appendChild(listItem);
    });  
});


// Manejador para la presentación del formulario (Agregar Producto)
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form)

  // Obtener los valores del formulario
  const title = formData.get("title");
  const description = formData.get("description");
  const code = formData.get("code");
  const price = formData.get("price");
  const stock = formData.get("stock");
  const category = formData.get("category");
  const thumbnail = formData.get("thumbnail");

  // Emitir un evento de Socket.IO para agregar un nuevo producto
  socket.emit("addProduct", { title, description, code, price, stock, category, thumbnail });
  form.reset();
});



