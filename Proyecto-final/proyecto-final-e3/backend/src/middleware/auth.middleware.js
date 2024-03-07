import jwt from 'jsonwebtoken';
import config from '../config/env.config.js';
import { UserModel } from '../models/user.model.js';
import { RoleModel } from '../models/role.model.js';

export const verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;

    const user = await UserModel.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: "No user found" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

export const isAuthenticated = async (req, res, next) => {

  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}


export const isAdmin = async (req, res, next) => {
  try {
    if (!user || !user.roles || !user.roles.includes('admin')) {
      return res.status(403).json({ message: 'Forbidden - Admin access required' });
    }
  } catch (error) {
    
  }
  const user = req.user;
  next();
};