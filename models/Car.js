import {Schema, model} from "mongoose";

const Car = new Schema({
    img: {type: String, required: true},
    title: {type: String, unique: true, required: true},
    brand: {type: String, required: true},
    price: {type: Number, required: true},
})

export default model('Car', Car)