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

    async delete(req, res) {
        try {
            const car = await Car.findByIdAndDelete(req.params.id); // Найти ролл и удалить ролл
            if (!car) {
                return res.status(404).json({ message: "Машина с таким ID не был найден" });
            }
            return (
                res.json({ message: "Машина успешно удалено" })
        )
        } catch (e) {
            return res.status(500).json({ message: "Возникла ошибка при удалении машины" });
        }
    }

    async create(req, res) {
        try {
            const {img, title, price} = req.body
            const car = new Car({img, title, price})
            await car.save()
            return res.json('Машина был успешно сохранено')
        } catch (e) {
            res.status(400).json({message: "Машина с таким именем уже есть"})
        }
    }
    async findOne(req, res) {
        try {
            const id = req.params.id
            if (id === null) {
                return res.status(400).json({message: "Такой машины не существует"})
            }
            if (!id) {
                return res.status(400).json({message: "Вы не указали ID машины"})
            }
            const car = await Car.findById(id)
            res.json(car)
        } catch (e) {
            res.status(400).json({message: "Машина с указанным ID не был найден"})
        }
    }
}

export default new carsController()
