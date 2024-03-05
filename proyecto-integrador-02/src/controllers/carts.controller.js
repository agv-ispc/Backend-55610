import { CartModel } from "../models/carts.model.js"

export const getCarts = async(req, res) => {
  const carts = await CartModel.find();
  res.json(carts);
}