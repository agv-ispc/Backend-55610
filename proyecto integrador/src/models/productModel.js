import mongoose from 'mongoose';

const productsCollection = "products";

const productSchema = new mongoose.Schema({
  title:{ 
    type: String, 
    required: true 
  },
  description:{ 
    type: String, 
    required: true
  },
  code:{
    type: String,
    required: true,
    unique: true
  },
  price:{ 
    type: Number,
    required: true 
  },
  status: Boolean,
  stock:{
    type: Number, 
    required: true
  },
  category:{
    type: String,
    required: true
  },
});

const productModel = mongoose.model(productsCollection, productSchema);

export default productModel;