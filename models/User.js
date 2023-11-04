import {Schema, model, } from "mongoose";

const User = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    cart: [{type: Schema.Types.ObjectId,ref: 'Cart'}],
    favorite: [{type: Schema.Types.ObjectId, ref: 'Favorite'}],
    roles: [{type: String, ref: 'Role'}],
    profile: {type: Schema.Types.ObjectId, ref: 'Profile'}
})

// экспростируем модель первый параметр это название а второй сама модель
export default model('User', User)