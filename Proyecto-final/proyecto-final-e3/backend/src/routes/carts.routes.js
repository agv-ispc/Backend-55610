import { Router } from 'express';
const router = Router();
import { verifyToken, isAuthenticated, isAdmin } from '../middleware/auth.middleware.js';

import * as cartController from '../controllers/carts.controller.js'

router.get('/', [verifyToken, isAuthenticated], cartController.getCarts)
router.get('/cart', [verifyToken, isAuthenticated], cartController.getCartById)
router.get('/productsincart', [verifyToken, isAuthenticated], cartController.getProductDetailsInCart)
router.put('/add', [ verifyToken, isAdmin ], cartController.addProductToCart)
router.delete('/delcart', [verifyToken, isAuthenticated], cartController.deleteProducts)

export default router;