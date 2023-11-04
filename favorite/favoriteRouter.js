import {Router} from "express";
import controller from './favoriteContreller.js'
import {authMiddleware} from "../middleware/authMiddleware.js";

const router = Router()

router.get('/favorites', authMiddleware , controller.getItems)
router.get('/totalFavoritesCount', authMiddleware , controller.getTotalFavoriteCount)
router.post('/favorite', authMiddleware , controller.toggleFavoriteItem)
router.delete('/favorites', authMiddleware, controller.deleteFavoriteItems)

export default router