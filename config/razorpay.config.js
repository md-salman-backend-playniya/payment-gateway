import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

function createRazorpayInstance() {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

export { createRazorpayInstance };
