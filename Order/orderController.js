import User from "../models/User.js";
import Order from "../models/Order.js";
import Profile from "../models/Profile.js";

class orderController {

    async getOrderItems(req, res) {
        try {
            const user = await User.findOne({username: req.user.username})
            const profiles = await Profile.find({user: user._id}).populate('order');
            const profile = profiles[0]; // Получаем первый элемент массива профилей
            const order = profile.order
            res.send(order)
        } catch (e) {
            res.status(400).send(e);
        }
    }

    async createOrderItem(req, res) {
        try {
            const { aboutDelivery, cartItems, price } = req.body;
            const user = await User.findOne({ username: req.user.username });
            let profile = await Profile.findOne({ user: user._id });

            if (!profile) {
                profile = new Profile({
                    user: user._id,
                    firstName: "",
                    lastName: "",
                    phone: "",
                    email: "",
                    order: [],
                });
                await profile.save();
            }

            const now = new Date(); // Получаем текущую дату и время
            const formattedDate = now.toLocaleString("ru-RU", {
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: false,
            }); // Форматируем дату и время в привычном формате

            const orderItem = {
                aboutDelivery,
                cartItems,
                price,
                date: formattedDate, // тип строка
            };

            profile.order.unshift(orderItem);
            await profile.save();

            res.send(orderItem);
        } catch (error) {
            console.error('Error creating cart item:', error);
            res.status(500).send('Failed to create cart item');
        }
    }

    async deleteOrderItem(req, res) {
        try {
            const user = await User.findOne({username: req.user.username});

            const item = user.cart.find(el => el._id === req.params.id);

            // Удаляем из массива user.cart
            user.cart.splice(user.cart.indexOf(item), 1);

            // Удаляем документ из коллекции Order
            await Order.findByIdAndRemove(req.params.id);

            await user.save();

            res.send({message: 'Item removed'});
        } catch (e) {
            res.status(400).send(e);
        }
    }
}

export default new orderController();
