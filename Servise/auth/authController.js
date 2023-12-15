import bcrypt from 'bcryptjs'
import Role from "../../models/Role.js";
import jwt from "jsonwebtoken"
import {validationResult} from 'express-validator'
import {secret} from '../../config.js'
import User from "../../models/User.js";

const generateSuccessToken = (id, roles, username) => {
    const payload = {
        id,
        roles,
        username
    }
    // Первый параметр payload объект с данными, который мы хотим спрятать в токен, второй секретный ключ по которому будет расшифровываться токен, третьим объект
    // опций сколько будет жить токен
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }
            const {username, password} = req.body

            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({resultCode: 1, message: 'Пользователь с таким именем существует'})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const UserRole = await Role.findOne({value: "USER"})
            const user = new User({username, password: hashPassword, roles: [UserRole.value]})
            await user.save()
            res.send({resultCode: 0, message: "Пользователь успешно зарегистрирован"})
        } catch (e) {
            console.log(e)
            res.status(400).json({resultCode: 1, message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({resultCode: 1, message: `Пользователь ${username} не найден`})
            }
            // Сравниваем пароль, который пришел с базы данных(захешированный) с тем паролей котоырй мы отпарвили в запросе
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({resultCode: 1, message: 'Веден неверный пароль'})
            }
            const token = generateSuccessToken(user._id, user.roles, user.username)
            return res.json({resultCode: 0, token, username: user.username})
        } catch (e) {
            console.log(e)
            res.status(400).json({resultCode: 1, message: 'Login error'})
        }
    }

    async changePassword(req, res) {
        try {
            const { currentPassword, newPassword } = req.body;
            if (currentPassword === newPassword) {
                res.status(400).send({ message: "Текущий и новый пароли совпадают. Пожалуйста, введите другой пароль." });
            }
            const username = req.user.username

            const user = await User.findOne({ username });

            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }

            const isValidPassword = bcrypt.compareSync(currentPassword, user.password);

            if (!isValidPassword) {
                return res.status(400).json({ message: 'Текущий пароль неверный' });
            }

            const hashedNewPassword = bcrypt.hashSync(newPassword, 7);

            user.password = hashedNewPassword;

            await user.save();

            return res.json({ message: 'Пароль успешно изменен' });

        } catch(e) {
            console.error(e);
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
        }
    }

    async getUser(req, res) {
        try {
            if (req.user.isAdmin) {
                const users = await User.find()
                res.json(users)
            } else {
             res.send({message: "У вас нехватает полномочий"})
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export default new AuthController()