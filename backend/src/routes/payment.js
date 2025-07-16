import express from "express";
import * as paymentController from "../controller/paymentController.js";

const router = express.Router();

// Create Razorpay order
router.post("/orders", paymentController.createOrder);

// Verify payment and create donation
router.post("/verify", paymentController.verifyPayment);

export default router; 