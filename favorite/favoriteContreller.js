import User from "../models/User.js";
import Favorite from "../models/Favorite.js";

class favoriteController {

    async getItems(req, res) {
        try {
            const user = await User.findOne({username: req.user.username})
            const favoriteItems = await Favorite.find({user})
            res.send(favoriteItems)
        } catch (e) {
            res.status(400).send(e);
        }
    }

    async toggleFavoriteItem(req, res) {
        try {
            const {oldId, img, title, description, weight, taste, price, count, prices, priceDrinks, category} = req.body;
            const user = await User.findOne({username: req.user.username});
            const favorite = await Favorite.find({user});
            const favoriteCandidate = favorite.find((el) => el.title === title);

            if (favoriteCandidate) {
                await Favorite.deleteOne({title});
                const item = user.favorite.find(el => el !== favoriteCandidate._id);
                user.favorite.splice(user.cart.indexOf(item), 1);
                await user.save();
                res.send({resultCode: 0, message: "Избранный элемент удален успешно"});
            } else {
                const favoriteItem = new Favorite({
                    oldId,
                    user: user._id,
                    img,
                    title,
                    description,
                    weight,
                });

                if (price) {
                    favoriteItem.price = price;
                }
                if (category) {
                    favoriteItem.category = category;
                }
                if (prices) {
                    favoriteItem.prices = prices;
                }
                if (count) {
                    favoriteItem.count = count;
                }
                if (taste) {
                    favoriteItem.taste = taste;
                }
                if (priceDrinks) {
                    favoriteItem.priceDrinks = priceDrinks;
                }
                await favoriteItem.save();

                user.favorite.push(favoriteItem._id);
                await user.save();
                res.send(favoriteItem);
            }
        } catch (e) {
            res.status(500).send(e);
        }
    }
    async getTotalFavoriteCount(req, res) {
        try {
            const user = await User.findOne({username: req.user.username})
            const favoriteItems = await Favorite.find({user})
            res.send({resultCode: 0, totalFavoriteCount: favoriteItems.length})
        } catch (e) {
            res.sendStatus(400).send({resultCode: 1}, e);
        }
    }

    async deleteFavoriteItems(req, res) {
        try {
            const user = await User.findOne({username: req.user.username});
            const favoriteUser = await Favorite.find({user: user._id})
            if (favoriteUser.length === 0) {
                return res.status(400).send({message: 'Ваше избранное уже пустое, поэтому операция очистки не требуется.'});
            } else {
                await Favorite.deleteMany({user: user._id});
                user.favorite = []
                await user.save()
                res.send({message: 'Избранное было успешно очищено'});
            }
        } catch (e) {
            res.status(400).send(e);
        }
    }
}


export default new favoriteController();
