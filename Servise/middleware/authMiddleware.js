import {secret} from "../../config.js";
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({resultCode: 1, message: 'Не авторизован'});
    }
    try {
        req.user = jwt.verify(token, secret);
        req.resultCode = 0
        if (!req.user.roles.includes('ADMIN')) {
            req.user.isAdmin = false;
        } else {
            req.user.isAdmin = true;
        }
        next();
    } catch (e) {
        return res.status(401).json({resultCode: 1, message: 'Неверный токен'})
    }
};