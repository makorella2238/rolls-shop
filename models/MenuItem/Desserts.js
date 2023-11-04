import {Schema, model} from "mongoose";

const Desserts = new Schema({
    img: {type: String, required: true},
    // unique означает что поле будет уникальное
    title: {type: String, unique: true, required: true},
    weight: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true }
})

export default model('Desserts', Desserts)
