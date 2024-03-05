// Importar el módulo 'express' para crear la aplicación web
import express from 'express';
import { __dirname } from './dirname.js';
import handlebars from "express-handlebars";
import { Server } from "socket.io";
// Importar las rutas de productos y carros
import productsRoutes from './routes/products.routes.js';
import cartsRoutes from './routes/carts.routes.js';
import viewsRouter from "./routes/views.routes.js";

import ProductsManager from './controllers/productsManager.js';

// Crear una instancia de la aplicación Express
const app = express();
// Puerto en el que el servidor escuchará las solicitudes
const PORT = 8080;
// Iniciar el servidor y escuchar en el puerto especificado
const httpServer = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);
const io = new Server(httpServer);
// Configurar body-parser para analizar solicitudes JSON
app.use(express.json());
// Middleware para parsear los datos en las solicitudes POST con formato 'application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: true }))

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main",
  })
);

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

app.use(express.static(__dirname + "/public"));

//Rutas

// Usar las rutas de productos y carros
app.use("/", viewsRouter);
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

// Middleware para manejar solicitudes no encontradas
app.use((req, res) => {
  res.status(404).send("Error - pagina no encontrada");
});

const pmanager = new ProductsManager('./db/products.json')

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("addProduct", async (data) => {
    console.log(data);
    try {
      await pmanager.addProduct(data);
      socket.emit("products-list", pmanager.getProducts());
    } catch (error) {
      console.log(error);
    }
  });

  socket.emit("products-list", pmanager.getProducts());
});

