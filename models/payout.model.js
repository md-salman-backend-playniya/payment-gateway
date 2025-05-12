import mongoose, { Schema } from "mongoose";

// UPI-specific details
const upiDetailsSchema = new Schema(
  {
    vpa: { type: String, required: true },
  },
  { _id: false }
);

// IMPS-specific details
const bankDetailsSchema = new Schema(
  {
    accountNumber: { type: String, required: true },
    ifsc: { type: String, required: true },
    name: { type: String, required: true },
  },
  { _id: false }
);

const payoutSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    method: {
      type: String,
      enum: ["UPI", "IMPS"],
      required: true,
    },
    razorpay_fund_account_id: {
      type: String,
      required: true,
      unique: true,
    },
    upiDetails: {
      type: upiDetailsSchema,
      required: function () {
        return this.method === "UPI";
      },
    },
    impsDetails: {
      type: bankDetailsSchema,
      required: function () {
        return this.method === "IMPS";
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Payout = mongoose.model("Payout", payoutSchema);

export { Payout };
