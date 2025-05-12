import mongoose, { Schema } from "mongoose";

const walletSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      default: "INR",
      enum: ["INR"],
    },
    razorpay_contact_id: {
      type: String,
      default: "",
    },
    kyc_completed: {
      type: Boolean,
      default: false,
    },
    kyc_info: {
      name: String,
      pan: String,
      aadhar: String,
      status: {
        type: String,
        enum: ["pending", "verified", "rejected"],
        default: "pending",
      },
    },
  },
  { timestamps: true }
);

const Wallet = mongoose.model("Wallet", walletSchema);

export { Wallet };
