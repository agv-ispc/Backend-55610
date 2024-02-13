import productModel from '../../models/products.model.js';

export default class ProductsDao {
  
  async getAllProducts() {
    const products = await productModel.find({});
    return products;
  }

  async getProductById(id) {
    return await productModel.findById(id);
  }

  async createProduct(product) {
    return await productModel.create(product);
  }

  async updateProduct(id, product) {
    return await productModel.findByIdAndUpdate(id, product);
  }

  async deleteProduct(id) {
    return await productModel.findByIdAndDelete(id);
  }
}

