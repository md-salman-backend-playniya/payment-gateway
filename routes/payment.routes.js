import express from "express";
import {
  createPayment,
  verifyPayment,
  webhookVerify,
} from "../controllers/payment.controller.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();

router.post("/verify", auth, verifyPayment);
router.post("/create-payment", auth, createPayment);
router.post(
  "/webhook-verify",
  express.raw({ type: "application/json" }),
  webhookVerify
);

// payout router

// create contact
// create fund account
// payout

// router.post("/payout", auth, payout);
// router.post("/contact", auth, contact);
// router.post("/fund-account", auth, fundAccount);

export { router };
