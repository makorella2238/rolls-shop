import {Schema, model} from "mongoose";

const Rolls = new Schema({
    img: {type: String, required: true},
    // unique означает что поле будет уникальное
    title: {type: String, unique: true, required: true},
    weight: {type: String, required: true},
    description: {type: String, required: true},
    count: {type: [Number], default: [6], enum: [4, 6, 8]},
    price: {
        type: {"4": Number, "6": Number, "8": Number, },
         required: true
    },
})

export default model('Rolls', Rolls)
