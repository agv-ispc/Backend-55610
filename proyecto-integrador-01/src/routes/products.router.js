import { Router } from 'express';
import { getAllProducts, getProductById, createProduct } from '../daos/controllers/products.controller.js';

const productsRouter = Router();

productsRouter.get('/', getAllProducts);
productsRouter.get('/products', getAllProducts);
productsRouter.get('/:id', getProductById);
productsRouter.post('/', createProduct);

export default productsRouter;