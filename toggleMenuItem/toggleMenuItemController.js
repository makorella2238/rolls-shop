import Rolls from "../models/MenuItem/Rolls.js";
import Soups from "../models/MenuItem/Soups.js";
import Drinks from "../models/MenuItem/Drinks.js";
import Desserts from "../models/MenuItem/Desserts.js";
import Pizzas from "../models/MenuItem/Pizzas.js";

class toggleMenuItemController {
    async favorites(req, res) {
        try {
            const id = req.params.id
            const [desserts, drinks, pizzas, rolls, soups] = await Promise.all([
                Desserts.find(),
                Drinks.find(),
                Pizzas.find(),
                Rolls.find(),
                Soups.find()
            ]);

            const allItems = [...desserts, ...drinks, ...pizzas, ...rolls, ...soups];
            let item = allItems.find(el => el._id.toString() === id.toString())

            if (item === null) {
                return res.status(404).json({resultCode: 1, message: "Элемент не найден"});
            }

            item.isFavorite = !item.isFavorite
            await item.save(); // Используем await перед roll.save() для дожидания сохранения
            res.json({resultCode: 0})
        } catch (e) {
            console.log(e);
            res.send(500).json({resultCode: 1, message: "Произошла ошибка сервера"});
        }
    }

    async cart(req, res) {
        try {
            const id = req.params.id
            const [desserts, drinks, pizzas, rolls, soups] = await Promise.all([
                Desserts.find(),
                Drinks.find(),
                Pizzas.find(),
                Rolls.find(),
                Soups.find()
            ]);

            const allItems = [...desserts, ...drinks, ...pizzas, ...rolls, ...soups];
            let item = allItems.find(el => el._id.toString() === id.toString())

            if (item === null) {
                return res.status(404).json({resultCode: 1, message: "Элемент не найден"});
            }
            item.inCart = !item.inCart;
            await item.save(); // Используем await перед roll.save() для дожидания сохранения
            res.json({resultCode: 0});
        } catch (e) {
            console.log(e);
            res.send(500).json({resultCode: 1, message: "Произошла ошибка сервера"});
        }
    }
}

export default new toggleMenuItemController()
