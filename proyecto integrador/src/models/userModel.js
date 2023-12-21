// Importa la biblioteca mongoose para interactuar con MongoDB.
const mongoose = require('mongoose');
// Define el nombre de la colección en la base de datos.
const usersCollection = "users";
// Define el esquema (schema) de los documentos que se guardarán en la colección "users".
const userSchema = new mongoose.Schema({
    // Campo para el primer nombre del usuario (tipo String).
    first_name: String,
    // Campo para el apellido del usuario (tipo String).
    last_name: String,
    // Campo para la dirección de correo electrónico del usuario.
    email: {
        type: String,
        unique: true,    // Asegura que no haya correos electrónicos duplicados.
        required: true,  // Requiere que se proporcione una dirección de correo electrónico.
        index: true,     // Crea un índice en este campo para mejorar la velocidad de las consultas.
    },
    // Campo para el rol del usuario (por defecto es "user" si no se especifica).    
    rol: {
        type: String,
        default: "user" // Valor por defecto si no se proporciona un rol.
    },
    // Campo para la contraseña del usuario (tipo String).    
    password: String,
    img: String,
});
// Campo para la URL de la imagen del usuario (tipo String).
const userModel = mongoose.model(usersCollection, userSchema);
// Exporta el modelo de usuario para que pueda ser utilizado en otras partes de la aplicación.
export default userModel;