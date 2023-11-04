import {Router} from "express";
import controller from './toggleMenuItemController.js'
import {authMiddleware} from "../middleware/authMiddleware.js";

const router = Router()

router.put('/cart/:id', authMiddleware, controller.cart)
router.put('/favorites/:id', authMiddleware, controller.favorites)

export default router