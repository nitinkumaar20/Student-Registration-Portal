import { Router } from "express";
import { createOrder, fetchOrder, paidOrder } from "../controllers/paymentController.js";
import { verifyJwt } from '../middleware/fetchuser.js'

const router = Router();

router.post('/createOrder', verifyJwt, createOrder)
router.get('/fetchOrder', fetchOrder)
router.post('/paidOrder', verifyJwt, paidOrder)

export default router;