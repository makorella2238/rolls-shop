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
            let items;

            switch (categoryId) {
                case MenuCategory.ROLLS:
                    items = await Rolls.find();
                    res.status(200).send({ category: 'Rolls', items });
                    break;
                case MenuCategory.PIZZAS:
                    items = await Pizzas.find();
                    res.status(200).send({ category: 'Pizzas', items });
                    break;
                case MenuCategory.DESSERTS:
                    items = await Desserts.find();
                    res.status(200).send({ category: 'Desserts', items });
                    break;
                case MenuCategory.SOUPS:
                    items = await Soups.find();
                    res.status(200).send({ category: 'Soups', items });
                    break;
                case MenuCategory.DRINKS:
                    items = await Drinks.find();
                    res.status(200).send({ category: 'Drinks', items });
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