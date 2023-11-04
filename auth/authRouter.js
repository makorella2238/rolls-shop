import {Router} from "express";
import controller from './authController.js'
import { check } from "express-validator";
import {authMiddleware} from "../middleware/authMiddleware.js";

const router = Router()

router.post('/registration', [
    check('username', "Имя пользователя не может быть пустым ").notEmpty(),
    check('username', "Имя пользователя должено быть от 4 до 14 символов").isLength({min: 4, max: 14}),
    check('password', "Пароль должен быть от 6 до 20 символов").isLength({min: 5, max: 20}),
    check('password', "Пароль не может быть пустым ").notEmpty(),
], controller.registration);
router.post('/changePassword', authMiddleware, controller.changePassword);
router.post('/login', controller.login);

router.get('/users',authMiddleware, controller.getUser);

export default router