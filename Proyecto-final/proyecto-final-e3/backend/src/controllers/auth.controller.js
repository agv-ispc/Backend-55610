import jwt from 'jsonwebtoken';
import config from '../config/env.config.js';
import { UserModel } from '../models/user.model.js';
import { RoleModel } from '../models/role.model.js';

export const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      roles,
      age } = req.body;

    const newUser = new UserModel({
      first_name,
      last_name,
      email,
      password: await UserModel.encryptPass(password),
      roles,
      age
    })

    if (roles) {
      const foundRoles = await RoleModel.find({ name: { $in: roles } })
      newUser.roles = foundRoles.map((role) => role._id)
    } else {
      const role = await RoleModel.findOne({ name: "user" })
      newUser.roles = [role._id]
    }

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, config.JWT_SECRET, {
      expiresIn: 60 * 60 * 24 //ss*mm*hh
    })
    console.log(newUser);
    return res.status(200).json({ token });

  } catch (error) {
    return res.status(500).json(error.message)
  }
};

export const login = async (req, res) => {
  try {
    const foundUser = await UserModel.findOne({ email: req.body.email }).populate(
      "roles"
    )

    if (!foundUser) return res.status(400).json({ message: "User not found" })

    const checkPass = await UserModel.comparePassword(
      req.body.password,
      foundUser.password
    )

    if (!checkPass)
      return res.status(401).json({
        token: null,
        message: "Invalid Password",
      })

    const token = jwt.sign({ id: foundUser._id }, config.JWT_SECRET, {
      expiresIn: 60 * 60 * 24 //ss*mm*hh
    })
    res.json({ token })

  } catch (error) {
    console.error(`Error: ${error}`)
  }
}