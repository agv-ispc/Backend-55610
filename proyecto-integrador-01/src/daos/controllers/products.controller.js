import ProductsDao from '../db-manager/products.dao.js';

const product = new ProductsDao();

// Definimos una ruta GET para '/products'. Esta ruta devolverá todos los productos.
export const getAllProducts = async (req, res) => {
  const products = await product.getAllProducts();
  
  res.json({ status: "success", payload: products });
};

export const getProductById = async (req, res) => {
  const product = await product.getProductById(req.params.id);
  res.json({
    product,
  });
};

export const createProduct = async (req, res) => {
  try {
    await product.createProduct(req.body);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.json({ info: "Error creating product", error });
  }
};
