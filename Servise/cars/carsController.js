import Car from "../../models/Car.js";

class carsController {
    async getAll(req, res) {
        try {
            const cars = await Car.find()
            res.json(cars)
        } catch (e) {
            console.log(e)
        }
    }
    async getBrands(req, res) {
        try {
            // Используем метод distinct для получения уникальных марок машин
            const brands = await Car.distinct("brand");
            res.json(brands);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: "Failed to get brands" });
        }
    }


    async delete(req, res) {
        try {
            const car = await Car.findByIdAndDelete(req.params.id); // Найти ролл и удалить ролл
            if (!car) {
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
            const {img, title, price, brand} = req.body
            const car = new Car({img, title, price, brand})
            await car.save()
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
            const car = await Car.findById(id)
            res.json(car)
        } catch (e) {
            res.status(400).json({message: "Меню с указанным ID не был найден"})
        }
    }
}

export default new carsController()
