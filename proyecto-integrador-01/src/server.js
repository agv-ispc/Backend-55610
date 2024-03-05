import express from 'express';
import mongoose from 'mongoose';

import { __dirname } from './dirname.js';
import path from 'path';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';


import productsRouter from './routes/products.router.js';
import viewsRouter from './routes/views.router.js';

import Handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';

// Crear una instancia de la aplicación Express
const app = express();

// Conectar a la base de datos MongoDB
const user = "agvispc";
const password = "Neil.96864";
const cluster = "cluster0.modbxsw.mongodb.net/?retryWrites=true&w=majority";
const MongoUrl = `mongodb+srv://${user}:${password}@${cluster}/`

mongoose.set('strictQuery', true);
// Manejo de errores al conectar a la base de datos
mongoose
.connect(MongoUrl)
.then(() => console.log("DB conected"))
.catch((err) => console.log(err));

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Configurar body-parser para analizar solicitudes JSON
app.use(express.json());
// Middleware para parsear los datos en las solicitudes POST con formato 'application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: true }))

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);

const db = mongoose.connection;

db.on('error', (error) => {
  console.error(`Error de conexion a la base de datos: ${error.message}`);
})
db.once('open', () => {
  console.log('Conexion exitosa a la base de datos');
})

// Puerto en el que el servidor escuchará las solicitudes
const PORT = 8080;
// Iniciar el servidor y escuchar en el puerto especificado
const httpServer = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);

const io = new Server(httpServer, {
  connectionStateRecovery: {}
});

io.on('connection', (socket) => {
  console.log('a user has connected!')

  socket.on('disconnect', () => {
    console.log('an user has disconnected')
  })

  socket.on('products-list', (products) => {
    io.emit('products-list', products)
  })
})
