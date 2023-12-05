import { Schema, model } from "mongoose";

const paymentSchema = Schema({
    user_id: { type: Schema.ObjectId, required: true, ref: 'Users' },
    order_id: { type: String, required: true, unique: true },
    payment_id: { type: String },
    signature_hash: { type: String },
    course_name: { type: String },
    course_id: { type: Schema.ObjectId },
    batch_id: { type: Schema.ObjectId },
    amount: { type: Number },
    status: { type: String },
    method: { type: String },
    order_at: { type: Date },
    paid_at: { type: Date }
})

export const paymentModel = model('Payment Record', paymentSchema);
// user_id , order_id, payment_id, course_nm, price, status 