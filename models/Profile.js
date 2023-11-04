import { Schema, model } from "mongoose";
import Order from "./Order.js";

const Profile = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    firstName: { type: String},
    lastName: { type: String},
    phone: { type: String },
    email: { type: String },
    order: [{type: Order.schema}]
})
export default model('Profile', Profile);