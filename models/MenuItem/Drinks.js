import {Schema, model} from "mongoose";

const Drinks = new Schema({
    img: {type: String, required: true},
    // unique означает что поле будет уникальное
    title: {type: String, unique: true, required: true},
    weight: {type: String, required: true},
    taste: {type: [String], required: false},
    description: {type: String, required: true},
    price: {type: [Number], required: true }
})

export default model('Drinks', Drinks)
