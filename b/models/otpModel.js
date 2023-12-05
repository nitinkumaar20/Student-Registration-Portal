import { Schema, model } from "mongoose"; 



const otpSchema = Schema({
    user_id: {type: Schema.ObjectId, ref:'Users', unique: true, required: true},
    otp: {type: Number, required: true},
})


export const otpModel = model('Otp', otpSchema);
