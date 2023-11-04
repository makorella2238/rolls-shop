import {model, Schema} from "mongoose";

const CartItem = new Schema({
    oldId: {type: String, required: true},
    img: { type: String, required: true },
    title: { type: String, required: true },
    weight: { type: String, required: true },
    category:{ type: String,  required: true},
    details: { type: String || Number},
    price: { type: Number, required: true },
    quantity: {type: Number, required: true}
});

const Order = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    aboutDelivery: {
        city: { type: String, required: true },
        comment: { type: String },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        payment: { type: String, required: true },
        phone: { type: String, required: true },
    },
    cartItems: [CartItem],
    price: {
        cartPrice: { type: Number, required: true },
        delivery: { type: Number, required: true },
        totalCartPrice: { type: Number, required: true },
    },
    date: {type: String, required:true}
});

export default model("Order", Order);
