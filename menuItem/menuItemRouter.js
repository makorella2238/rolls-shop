import {Router} from "express";
import controller from './menuItemContreller.js'

const router = Router()

router.get('/:title/', controller.getAll)
router.get('/:title/:id', controller.getItemById)
router.post('/:title/', controller.create)
router.delete('/:title/:id', controller.delete)


export default router