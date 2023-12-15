import {Router} from "express";
import controller from './cartContreller.js'
import {authMiddleware} from "../middleware/authMiddleware.js";

const router = Router()

router.get('/cart', authMiddleware , controller.getCartItems)
router.get('/cart/totalPrice', authMiddleware , controller.getTotalCartPrice)
router.post('/cart', authMiddleware , controller.createCartItem)
router.put('/cart/:id', authMiddleware , controller.updateCartItemCount)
router.delete('/cart/deleteAll', authMiddleware, controller.deleteCartItems)
router.delete('/cart/:id',authMiddleware, controller.deleteCartItem)


export default router