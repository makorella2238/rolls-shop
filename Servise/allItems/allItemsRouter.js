import {Router} from "express";
import controller from './allItemsContreller.js'

const router = Router()

router.get('/', controller.getAllMenuItems)

export default router