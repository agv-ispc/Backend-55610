// Importar el módulo 'express'
import express from 'express';
import { __dirname } from './dirname.js';
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import mongoose from 'mongoose';

// Importar las rutas de productos y carros
import productsRoutes from './routes/products.routes.js';
import cartsRoutes from './routes/carts.routes.js';
import viewsRouter from "./routes/views.routes.js";

import ProductsManager from './dao/controller/productsManager.js';

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

// Conectar a la base de datos MongoDB
const MongoUrl = "mongodb://localhost:27017/ecommerce"
mongoose.set("strictQuery", false);
// Manejo de errores al conectar a la base de datos
mongoose.connect(MongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => {
  console.error(`Error de conexión a la base de datos: ${error.message}`);
});

db.once('open', () => {
  console.log('Conexión exitosa a la base de datos');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Conexión a la base de datos cerrada');
    process.exit(0);
  });
});

try {
  await mongoose.connect(MongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Conexión exitosa a la base de datos');
} catch (error) {
  console.error(`Error al conectar a la base de datos: ${error.message}`);
}
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

