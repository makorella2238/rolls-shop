import express from 'express'
import mongoose from "mongoose";
import cors from "cors"
import menuRouter from "./menu/menuRouter.js"
import itemsRouter from "./menuItem/menuItemRouter.js";
import authRouter from "./auth/authRouter.js";
import cartRouter from "./cart/cartRouter.js";
import favoriteRouter from "./favorite/favoriteRouter.js";
import allItemsRouter from "./allItems/allItemsRouter.js";
import profileRouter from "./Profile/profileRouter.js";
//import orderRouter from "./order/OrderRouter.js";

const app = express()
const PORT =  process.env.PORT || 3200
const DB_URL = process.env.MONGODB_URI

app.use(cors({
    origin: "https://roll-shop.netlify.app",
    // origin: "http://localhost:5173",
    credentials: true
}));

const baseMenuURL = '/api/menu'

app.use(express.json())
app.use(baseMenuURL + '/all', allItemsRouter)
app.use(baseMenuURL, itemsRouter)
app.use(baseMenuURL, menuRouter)
app.use('/api/auth', authRouter)
app.use('/api/profile', profileRouter)
//app.use('/api/order', orderRouter)
app.use('/api', cartRouter)
app.use('/api', favoriteRouter)

async function startApp() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => {
            console.log('Server has been started on port ' + PORT)
        })
        console.log('Успешное подключение')
    } catch (e) {
        console.log(e)
    }
}

startApp()

export default app
