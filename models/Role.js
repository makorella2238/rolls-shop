import {Schema, model} from "mongoose";

const Role = new Schema({
    value: {type: String, unique: true, default: "USER"}
})

// экспростируем модель первый параметр это название а втрой сама модель
export default model('Role', Role)