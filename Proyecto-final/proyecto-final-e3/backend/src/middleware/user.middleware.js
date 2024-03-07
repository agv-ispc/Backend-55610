import { UserModel } from "../models/user.model.js";
import { RoleModel } from "../models/role.model.js";

export const checkUser = async (req, res, next) => {
  try {
    const foundUser = await UserModel.findOne({ username: req.body.username });
    if (foundUser)
      return res.status(400).json({ message: "The user already exists" });

    const email = await UserModel.findOne({ email: req.body.email });
    if (email)
      return res.status(400).json({ message: "The email already exists" });

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkRole = (req, res, next) => {
  req.body.roles.find();

  if (!req.body.roles) return res.status(400).json({ message: "No roles" });

  for (let i = 0; i < req.body.roles.length; i++) {
    if (!RoleModel.includes(req.body.roles[i])) {
      return res.status(400).json({
        message: `Role ${req.body.roles[i]} does not exist`,
      });
    }
  }

  next();
};