import * as paymentServices from "../services/paymentServices.js";
import * as donationServices from "../services/donationServices.js";
import { donationZod } from "../models/donation.js";

// POST /api/payment/orders
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }
    const order = await paymentServices.createOrder(amount);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to create order" });
  }
};

// POST /api/payment/verify
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      donorName,
      donorEmail,
      animalId,
      amount,
    } = req.body;

    // Verify payment signature
    const isValid = paymentServices.verifyPayment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    if (!isValid) {
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    // Create donation record
    const donationData = {
      donorName,
      donorEmail,
      amount,
      animal: animalId,
      paymentId: razorpay_payment_id,
    };
    // Validate donation data
    const parsed = donationZod.safeParse(donationData);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten() });
    }
    const donation = await donationServices.createDonation(parsed.data);
    res.status(201).json({ success: true, donation });
  } catch (err) {
    res.status(500).json({ error: "Payment verification failed" });
  }
}; 