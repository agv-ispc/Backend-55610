import { Router } from "express";
import ProductsDao from '../daos/db-manager/products.dao.js';

const productsDao = new ProductsDao();

const viewsRouter = Router();

viewsRouter.get("/", async (req, res) => {
  
  const products = await productsDao.getAllProducts();
  
  res.render("index", { products: products });
/*   try {
  } catch (err) {
    res.render('error')
  } */
});

viewsRouter.get("/products", async (req, res) => {
  try {
    const products = await productsDao.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default viewsRouter;