import { __dirname } from './dirname.js';
import { productModel } from `${__dirname}/models/productModels.js`

class ProductDao {
  async getProducts() {
    return await productModel.find();
  }
  async getProductById(id) {
    return await productModel.findById(id);
  }
  async addProduct(product) {
    return await productModel.add(product);
  }
  async updateProduct(id, product) {
    return await productModel.findByIdAndUpdate(id, product);
  }
  async deleteProductById(id) {
    return await productModel.findByIdAndDelete(id);
  }
}

export default new ProductDao();