import Catalog from "../models/Menu.js";
import Desserts from "../models/MenuItem/Desserts.js";
import Drinks from "../models/MenuItem/Drinks.js";
import Pizzas from "../models/MenuItem/Pizzas.js";
import Rolls from "../models/MenuItem/Rolls.js";
import Soups from "../models/MenuItem/Soups.js";

class menuController {
    async getAll(req, res) {
        try {
            const catalogs = await Catalog.find()
            res.json(catalogs)
        } catch (e) {
            console.log(e)
        }
    }

    async delete(req, res) {
        try {
            const catalog = await Catalog.findByIdAndDelete(req.params.id); // Найти ролл и удалить ролл
            if (!catalog) {
                return res.status(404).json({ message: "Меню с таким ID не был найден" });
            }
            return (
                res.json({ message: "Меню успешно удалено" })
        )
        } catch (e) {
            return res.status(500).json({ message: "Возникла ошибка при удалении меню" });
        }
    }

    async create(req, res) {
        try {
            const {img, title} = req.body
            const catalog = new Catalog({img, title})
            await catalog.save()
            return res.json('Меню был успешно сохранено')
        } catch (e) {
            res.status(400).json({message: "Меню с таким именем уже есть"})
        }
    }
    async findOne(req, res) {
        try {
            const id = req.params.id
            if (id === null) {
                return res.status(400).json({message: "Такого меню не существует"})
            }
            if (!id) {
                return res.status(400).json({message: "Вы не указали ID меню"})
            }
            const catalog = await Catalog.findById(id)
            res.json(catalog)
        } catch (e) {
            res.status(400).json({message: "Меню с указанным ID не был найден"})
        }
    }
    async getAllItems(req, res) {
        try {
            const desserts = await Desserts.find()
            const drinks = await Drinks.find()
            const pizzas = await Pizzas.find()
            const rolls = await Rolls.find()
            const soups = await Soups.find()
            const allItems = desserts.concat(drinks, pizzas, rolls, soups)
            res.json(allItems)
        } catch (e) {
            console.log(e)
        }
    }
}

export default new menuController()
