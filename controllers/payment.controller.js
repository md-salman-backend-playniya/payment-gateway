import dotenv from "dotenv";
import crypto from "crypto";
import { createRazorpayInstance } from "../config/razorpay.config.js";
dotenv.config();

const razorpay = createRazorpayInstance();

async function createPayment(req, res) {
  const { amount, currency } = req.body;
  const userId = req.user.userId;
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  const options = {
    amount: amount * 100,
    currency,
    notes: {
      userId,
    },
  };

  try {
    razorpay.orders.create(options, (err, order) => {
      console.log(`razor pay order created order:${order}`);

      if (err) {
        return res.status(500).json({
          success: false,
          message: "Something went wrong while creating razorpay orders",
          error: err,
        });
      }
      res.status(200).json({
        success: true,
        message: "payment created successfully",
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong while creating payment",
      error: error.message,
    });
  }
}

async function verifyPayment(req, res) {
  console.log("inside verify...");
  const userId = req.user.userId;

  if (!userId) {
    return res.status(500).json({
      success: false,
      message: "User not found",
    });
  }

  const { razorpay_order_id, razorpay_payment_id, signature } = req.body;
  const SECRET = process.env.RAZORPAY_KEY_SECRET;

  try {
    const hmac = crypto.createHmac("sha256", SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === signature) {
      //TODO: perform db operation here

      return res.status(200).json({
        success: true,
        message: "payment verified successfully",
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong while verifying payment",
      error: error.message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while verifying payment",
      error: error.message,
    });
  }
}

function webhookVerify(req, res) {
  console.log("inside webhook", typeof req.body);
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers["x-razorpay-signature"];

  try {
    if (!Buffer.isBuffer(req.body)) {
      console.error("Expected req.body to be a Buffer");
      return res.status(400).json({
        success: false,
        message: "Invalid request body format",
      });
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(req.body)
      .digest("hex");

    if (expectedSignature === signature) {
      const event = JSON.parse(req.body.toString());
      console.log("✅ Webhook verified", JSON.stringify(event, null, 2));

      //TODO:

      return res.status(200).json({ received: true });
    } else {
      console.error(`invalid signature 🔴`);
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error(`something went wrong in webhook 🔴 ${error}`);
    return res.status(500).json({
      success: false,
      message: "Webhook verification failed",
      error: error.message,
    });
  }
}

export { verifyPayment, createPayment, webhookVerify };
