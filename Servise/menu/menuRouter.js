import {Router} from "express";
import controller from './menuController.js'

const router = Router()

router.get('/', controller.getAll)
router.get('/:id', controller.findOne)
router.post('/', controller.create)
router.delete('/:id', controller.delete)

export default router