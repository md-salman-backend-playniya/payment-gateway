import mongoose, { Schema } from "mongoose";

const ledgerSchema = new Schema(
  {
    wallet_id: {
      type: Schema.Types.ObjectId,
      ref: "Wallet",
      required: true,
    },
    type: {
      type: String,
      enum: ["add_money", "withdraw", "refund", "bonus"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 100,
    },
    status: {
      type: String,
      enum: ["success", "failed", "pending"],
      default: "pending",
    },
    razorpay_transaction_id: String,
    remarks: String,
    reference_id: String,
  },
  { timestamps: true }
);

const Ledger = mongoose.model("Ledger", ledgerSchema);

export { Ledger };
