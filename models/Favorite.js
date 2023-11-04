import {Schema, model} from "mongoose";

const Favorite = new Schema({
    oldId: {type: String, required: true, unique: true},
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    img: {type: String, required: true},
    // category: {type: String},
    // unique означает что поле будет уникальное
    title: {type: String, unique: true, required: true},
    description: {type: String, required: true},
    category:{ type: String },
    weight: {type: String, required: true},
    taste: {type: [String], default: null },
    count: {type: [Number], enum: [4, 6, 8]},
    price: {type: Number, default: null },
    priceDrinks:{type: [Number], default: null},
    prices: {
        type: {"4": Number, "6": Number, "8": Number, },
    },

})

export default model('Favorite', Favorite)
