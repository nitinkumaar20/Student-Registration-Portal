import { paymentModel } from '../models/paymentModel.js';
import Razorpay from 'razorpay';
import { batchModel, courseModel } from '../models/courseModel.js';

const PaymentGatway = new Razorpay({key_secret: 'Azr8oeTi1Tf7RT0zXmwfJREo', key_id: 'rzp_test_Va8zcPCazlNao1'});

export const createOrder = async (req, res) => {
    try {
        const { user_id, course_id, course_name } = req.body
     
        const order = await PaymentGatway.orders.create({
            amount: 5000 * 100,
            currency: 'INR',
            receipt: 'Receipt#No20',
            notes: {
                customer_id: user_id,
                course_id,
                course_name
            }
        })

        console.log(order);
        const model = new paymentModel({user_id, course_id, course_name, amount: order.amount, order_id: order.id, status: order.status, order_at: order.created_at})
        await model.save();
        return res.json({result: order}); 
    } catch (err) {
        console.log(err);
        return res.json({error: err.message}); 
    }
}

export const fetchOrder = async (req, res) => {
    // const rep = await PaymentGatway.payments.fetch('pay_MWlvpKU0jB7daa')
    // const rep = await PaymentGatway.orders.fetch('order_MWkhfi3QgR9cRc')
    // const rep = await PaymentGatway.orders.all()

    const rep = await batchModel.find()
    console.log(rep);
    return res.json({rep}); 
}


export const paidOrder = async (req, res) => {
    try {
        // const { user_id, order_id, payent_id, signature_hash } = req.body;
        const {user_id, razorpay_order_id
            , razorpay_payment_id
            , razorpay_signature
        } = req.body
        console.log({user_id, razorpay_order_id
            , razorpay_payment_id
            , razorpay_signature});
        const payment = await PaymentGatway.payments.fetch(razorpay_payment_id)
        console.log(payment);

        return res.json({message: 'done'})
    } catch (err) {
        console.log(err);
        return res.json({error: err.message})
    }
}

// pay_MWketEHiStIpNE
// pay_MWkjyX5gIAEc9K
// model -> user_id , order_id, payment_id, course_nm, price, status 

// var { validatePaymentVerification, validateWebhookSignature } = require('./dist/utils/razorpay-utils');
// validatePaymentVerification({"order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);