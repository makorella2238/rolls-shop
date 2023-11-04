import {Schema, model} from "mongoose";

const Menu = new Schema({
    img: {type: String, required: true},
    // unique означает что поле будет уникальное
    title: {type: String, unique: true, required: true},
})

export default model('Menu', Menu)