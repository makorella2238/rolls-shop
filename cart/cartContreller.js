import Cart from "../models/Cart.js";
import User from "../models/User.js";

class cartController {

    async getCartItems(req, res) {
        try {
            const user = await User.findOne({username: req.user.username}).populate('cart');
            const cartItems = await Cart.find({user})
            res.send(cartItems)
        } catch (e) {
            res.status(400).send(e);
        }
    }

    async createCartItem(req, res) {
        try {
            const {oldId, img, title, weight, price, details, category} = req.body;
            const user = await User.findOne({username: req.user.username});
            const existingCartItem = await Cart.findOne({user: user._id, title, details});

            if (existingCartItem) {
                existingCartItem.quantity += 1;
                await existingCartItem.save();
                return res.send(existingCartItem);
            } else {

                const cartItem = new Cart({
                    oldId,
                    user: user._id,
                    img,
                    title,
                    weight,
                    price,
                    details,
                    category
                });
                await cartItem.save();
                user.cart.push(cartItem._id);
                await user.save();
                res.send(cartItem);
            }
        } catch (error) {
            console.error('Error creating cart item:', error);
            res.status(500).send('Failed to create cart item');
        }
    }

    async deleteCartItem(req, res) {
        try {
            const user = await User.findOne({username: req.user.username});

            const item = user.cart.find(el => el._id === req.params.id);

            // Удаляем из массива user.cart
            user.cart.splice(user.cart.indexOf(item), 1);

            // Удаляем документ из коллекции Cart
            await Cart.findByIdAndRemove(req.params.id);

            await user.save();

            res.send({message: 'Item removed'});
        } catch (e) {
            res.status(400).send(e);
        }
    }

    async deleteCartItems(req, res) {
        try {
            const user = await User.findOne({username: req.user.username});
            const cartUser = await Cart.find({user: user._id})
            if (cartUser.length === 0) {
                return res.status(400).send({message: 'Ваша корзина уже пуста, поэтому операция очистки не требуется.'});
            } else {
                await Cart.deleteMany({user: user._id});
                user.cart = []
                await user.save()
                res.send({message: 'Корзина была успешно очищена'});
            }
        } catch (e) {
            res.status(400).send(e);
        }
    }

    async updateCartItemCount(req, res) {
        try {
            const {id} = req.params;
            const {value} = req.body;
            const item = await Cart.findOne({_id: id});
            item.quantity = item.quantity + value;
            await item.save();

            res.send({resultCode: 0, message: "Успешное обновление количесва"});
        } catch (e) {
            res.status(400).send({resultCode: 1, message: e});
        }
    }

    async getTotalCartPrice(req, res) {
        try {
            const userData = req.user
            const user = await User.findOne({username: req.user.username}).populate('cart');
            const totalCartPrice = user.cart.length
                ? user.cart.map(item => item.price * item.quantity)
                    .reduce((sum, item) => sum + item, 0)
                : 0;

            res.send({
                totalCartPrice,
                userData
            });
        } catch (e) {
            res.status(400).send({resultCode: 1, message: e});
        }
    }

}


export default new cartController();
