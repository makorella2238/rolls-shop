import Rolls from "../models/MenuItem/Rolls.js";
import Pizzas from "../models/MenuItem/Pizzas.js";
import Desserts from "../models/MenuItem/Desserts.js";
import Drinks from "../models/MenuItem/Drinks.js";
import Soups from "../models/MenuItem/Soups.js";
import Roll from "../models/MenuItem/Rolls.js";

class rollController {
    async getAll(req, res) {
        try {
            let items;
            switch (req.params.title) {
                case "rolls":
                    items = await Rolls.find();
                    break
                case "soups":
                    items = await Soups.find();
                    break
                case "drinks":
                    items = await Drinks.find();
                    break
                case "desserts":
                    items = await Desserts.find();
                    break
                case "pizzas":
                    items = await Pizzas.find();
                    break
                default:
                    return res.status(404).json({message: "Такой тип элемента не поддерживается"});
            }
            res.json(items);
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Ошибка при получении элементов"});
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id
            if (!id) {
                return res.status(404).json({message: "Элемент меню с таким id не был найден"});
            }
            let items;
            switch (req.params.title) {
                case "rolls":
                    items = await Roll.findByIdAndDelete(req.params.id); // Найти ролл и удалить ролл
                    break
                case "soups":
                    items = await Roll.findByIdAndDelete(req.params.id); // Найти ролл и удалить ролл
                    break
                case "drinks":
                    items = await Roll.findByIdAndDelete(req.params.id); // Найти ролл и удалить ролл
                    break
                case "desserts":
                    items = await Roll.findByIdAndDelete(req.params.id); // Найти ролл и удалить ролл
                    break
                case "pizzas":
                    items = await Roll.findByIdAndDelete(req.params.id); // Найти ролл и удалить ролл
                    break
                default:
                    return res.status(404).json({message: "Такой тип элемента не поддерживается"});
            }
            return (res.json(items)
                // res.json({ message: "Ролл успешно удален" })
            )
        } catch (e) {
            return res.status(500).json({message: "Возникла ошибка при удалении элемента меню"});
        }
    }

    async create(req, res) {
        try {
            let items;
            const {img, title, weight, isFavorite, inCart, description, price} = req.body;

            switch (req.params.title) {
                case "rolls":
                    const {count} = req.body;
                    items = new Roll({img, title, weight, isFavorite, inCart, description, count, price});
                    break;
                case "soups":
                    items = new Soups({img, title, weight, isFavorite, inCart, description, price});
                    break;
                case "drinks":
                    const {taste} = req.body;
                    items = new Drinks({img, title, weight, isFavorite, inCart, description, taste, price});
                    break;
                case "desserts":
                    items = new Desserts({img, title, weight, isFavorite, inCart, description, price});
                    break;
                case "pizzas":
                    items = new Pizzas({img, title, weight, isFavorite, inCart, description, price});
                    break;
                default:
                    return res.status(404).json({message: "Такой тип элемента не поддерживается"});
            }

            await items.save();
            return res.json(items);
        } catch (e) {
            res.status(400).json({message: "Элемент меню с таким именем уже есть"});
        }
    }

    async getItemById(req, res) {
        try {
            let items;
            const id = req.params.id;
            const title = req.params.title
            switch (title) {
                case "rolls":
                    items = await Rolls.findById(id);
                    break;
                case "soups":
                    items = await Soups.findById(req.params.id);
                    break;
                case "drinks":
                    items = await Drinks.findById(req.params.id);
                    break;
                case "desserts":
                    items = await Desserts.findById(req.params.id);
                    break;
                case "pizzas":
                    items = await Pizzas.findById(req.params.id);
                    break;
                default:
                    return res.status(404).json({ message: "Такой тип элемента не поддерживается" });
            }
            res.send(items);
        } catch (error) {
            console.error('Find error item:', error);
            res.status(500).json({ message: "Ошибка при получении элемента" });
        }
    }
}

export default new rollController()