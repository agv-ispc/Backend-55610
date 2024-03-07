import { Router } from "express";
import { createUser } from "../controllers/user.controller.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.middleware.js";
import { checkUser } from '../middleware/user.middleware.js'

const router = Router();

router.post("/", [isAuthenticated, isAdmin, checkUser], createUser);

export default router;