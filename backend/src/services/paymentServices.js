import dotenv from "dotenv";
dotenv.config();

import Razorpay from "razorpay";
import crypto from "crypto";

// console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
// console.log("RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (amount) => {
  // Razorpay expects amount in paise (INR * 100)
  const options = {
    amount: Math.round(amount * 100),
    currency: "INR",
    payment_capture: 1,
  };
  console.log("options:", options);
  return await razorpay.orders.create(options);
};

export const verifyPayment = ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  console.log("body:", body);
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");
  return expectedSignature === razorpay_signature;
}; 