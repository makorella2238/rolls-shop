import {Router} from "express";
import controller from './profileController.js'
import {authMiddleware} from "../middleware/authMiddleware.js";

const router = Router()

router.get('/', authMiddleware , controller.getProfile)
router.post('/', authMiddleware , controller.updateProfile)
router.delete('/', authMiddleware, controller.deleteProfile)


export default router