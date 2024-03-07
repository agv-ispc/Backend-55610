import { Router } from 'express';
const router = Router();

import * as prodController from '../controllers/products.controller.js';
import { isAdmin, isAuthenticated, verifyToken } from '../middleware/auth.middleware.js';

router.post('/', [ verifyToken, isAdmin ], prodController.addProduct);
router.get('/', [verifyToken, isAuthenticated], prodController.getProducts);
router.get('/:prodid', isAuthenticated, prodController.getProductById);
router.put('/:prodid', [ verifyToken, isAdmin ], prodController.updateProduct);
router.delete('/:prodid', [ verifyToken, isAdmin ], prodController.deleteProduct);

export default router;
