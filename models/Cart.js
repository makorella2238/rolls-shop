import { Schema, model } from "mongoose";

const Cart = new Schema({
    oldId: {type: String, required: true},
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    img: { type: String, required: true },
    title: { type: String, required: true },
    weight: { type: String },
    category:{ type: String,  required: true},
    details: { type: String || Number, default: null},
    price: { type: Number, required: true },
    quantity: {type: Number, default: 1}
})

export default model('Cart', Cart);