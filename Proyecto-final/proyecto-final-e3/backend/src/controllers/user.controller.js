import { UserModel } from "../models/user.model.js";
import { RoleModel } from "../models/role.model.js";

export const createUser = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    const rolesFound = await RoleModel.find({ name: { $in: roles } });

    const user = new UserModel({
      username,
      email,
      password,
      roles: rolesFound.map((role) => role._id),
    });

     user.password = await UserModel.encryptPassword(user.password);

    
    const savedUser = await user.save();

    return res.status(200).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      roles: savedUser.roles,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async (req, res) => {
  const users = await UserModel.find();
  return res.json(users);
};

export const getUser = async (req, res) => {
  const user = await UserModel.findById(req.params.userId);
  return res.json(user);
};