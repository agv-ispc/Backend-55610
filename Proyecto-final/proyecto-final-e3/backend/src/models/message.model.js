import mongoose from 'mongoose';

const messagesCollection = "messages";

// Definimos el esquema para los mensajes
const messageSchema = new mongoose.Schema({
  userId: Number,
  id: Number,
  body: String
});

// Creamos el modelo de mensaje
const MessageModel = mongoose.model(messagesCollection, messageSchema);

export default MessageModel;
