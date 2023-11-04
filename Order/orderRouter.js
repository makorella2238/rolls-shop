import {Router} from "express";
import controller from './orderController.js'
import {authMiddleware} from "../middleware/authMiddleware.js";

const router = Router()

router.get('/', authMiddleware , controller.getOrderItems)
router.post('/', authMiddleware , controller.createOrderItem)
router.delete('/',authMiddleware, controller.deleteOrderItem)

export default router