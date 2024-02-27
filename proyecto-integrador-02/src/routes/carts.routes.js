import { Router } from 'express';
const router = Router();

import * as cartController from '../controllers/carts.controller.js'

router.get('/', cartController.getCarts)
/* router.post('/', cartController.addCart)
router.get('/:cartid', cartController.getCartById)
router.put('/:cartid', cartController.updateCart)
router.delete('/:cartid', cartController.deleteCart) */

export default router;