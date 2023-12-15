import express from 'express'
import mongoose from "mongoose";
import cors from "cors"
import menuRouter from "./Servise/menu/menuRouter.js"
import itemsRouter from "./Servise/menuItem/menuItemRouter.js";
import authRouter from "./Servise/auth/authRouter.js";
import cartRouter from "./Servise/cart/cartRouter.js";
import favoriteRouter from "./Servise/favorite/favoriteRouter.js";
import allItemsRouter from "./Servise/allItems/allItemsRouter.js";
import profileRouter from "./Servise/Profile/profileRouter.js";
import orderRouter from "./Servise/Order/orderRouter.js";
import carsRouter from "./Servise/cars/carsRouter.js";

const app = express()
const PORT =  process.env.PORT || 3200
const DB_URL = process.env.MONGODB_URI || 'mongodb+srv://makorella:makorella2238@cluster1.kryzgko.mongodb.net'

app.use(cors({
    //origin: "https://roll-shop.netlify.app",
    origin: "http:/localhost:3000"
    credentials: true
}));

const baseMenuURL = '/api/menu'

app.use(express.json())
app.use('/api/order', orderRouter)
app.use(baseMenuURL + '/all', allItemsRouter)
app.use(baseMenuURL, itemsRouter)
app.use(baseMenuURL, menuRouter)
app.use('/api/cars', carsRouter )
app.use('/api/auth', authRouter)
app.use('/api/profile', profileRouter)
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
