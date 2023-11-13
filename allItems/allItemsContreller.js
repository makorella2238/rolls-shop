import Rolls from "../models/MenuItem/Rolls.js";
import Pizzas from "../models/MenuItem/Pizzas.js";
import Desserts from "../models/MenuItem/Desserts.js";
import Soups from "../models/MenuItem/Soups.js";
import Drinks from "../models/MenuItem/Drinks.js";

class RollController {
    async getAllMenuItems(req, res) {
        try {
            const MenuCategory = {
                ROLLS: 1,
                PIZZAS: 2,
                DESSERTS: 3,
                SOUPS: 4,
                DRINKS: 5,
            };

            const categoryId = Number(req.query.category);
            let items = [];
            let category = '';

            switch (categoryId) {
                case MenuCategory.ROLLS:
                    category = 'Rolls';
                    items = await Rolls.find();
                    break;
                case MenuCategory.PIZZAS:
                    category = 'Pizzas';
                    items = await Pizzas.find();
                    break;
                case MenuCategory.DESSERTS:
                    category = 'Desserts';
                    items = await Desserts.find();
                    break;
                case MenuCategory.SOUPS:
                    category = 'Soups';
                    items = await Soups.find();
                    break;
                case MenuCategory.DRINKS:
                    category = 'Drinks';
                    items = await Drinks.find();
                    break;
                default:
                    res.status(404).send('Неверный ID категории');
                    return;
            }
        } catch (e) {
            console.log(e);
            res.status(500).send({ message: "Ошибка при получении меню" });
        }
    }
}

export default new RollController();