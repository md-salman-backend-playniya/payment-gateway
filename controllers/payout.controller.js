import { createRazorpayInstance } from "../config/razorpay.config.js";
import {
  createContact,
  createFundAccount,
  createPayout,
} from "../utils/payout.utils.js";

async function payout(req, res) {
  const {
    fund_account_id,
    amount,
    currency = "INR",
    mode = "IMPS",
    purpose = "payout",
    narration = "Payout transfer",
    reference_id,
  } = req.body;

  if (!fund_account_id || !amount) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: fund_account_id, amount",
    });
  }

  const payoutPayload = {
    fund_account_id,
    amount,
    currency,
    mode,
    purpose,
    narration,
    reference_id: reference_id || `payout_${Date.now()}`,
  };

  try {
    const payout = await createPayout(payoutPayload);
    console.log(`🟢 Payout successful: ${payout.id}`);
    // TODO: update DB
    return res.status(201).json({ success: true, payout });
  } catch (error) {
    console.error("🔴Error creating payout:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

async function contact(req, res) {
  const {
    name,
    email,
    contact_number,
    type = "customer",
    reference_id,
    notes,
  } = req.body;

  const userId = "12345lkhjkhkj";
  //   const userId = req.headers.user.userId;

  if (!name || !email || !contact_number) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: name, email, contact",
    });
  }

  if (type !== "customer")
    return res.status(400).json({
      success: false,
      message: "Invalid type in body",
    });

  const contactData = {
    name,
    email,
    contact: contact_number,
    type,
    reference_id: reference_id || `user_${userId}`,
    notes: notes || {},
  };

  try {
    const contact = await createContact(contactData);
    //TODO: update DB
    console.log(`contact created🟢 ${contact}`);

    return res.status(201).json({
      success: true,
      message: "Contact created successfully",
      contact,
    });
  } catch (error) {
    console.error("🔴Error creating Razorpay contact:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Something went wrong while creating contact",
        error: error.message,
      });
  }
}

async function fundAccount(req, res) {
  const { contact_id, account_type, bank_account, vpa } = req.body;

  if (!contact_id || !account_type) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: contact_id, account_type",
    });
  }

  if (account_type !== "bank_account" && account_type !== "vpa") {
    return res.status(400).json({
      success: false,
      message: "Invalid account_type. Must be 'bank_account' or 'vpa'",
    });
  }

  const fundAccountData = {
    contact_id,
    account_type,
    [account_type]: account_type === "bank_account" ? bank_account : vpa,
  };

  try {
    const fundAccount = await createFundAccount(fundAccountData);
    console.log(`fund account created🟢 ${fundAccount.id}`);
    // TODO: update DB
    return res.status(201).json({ success: true, fa_id: fundAccount });
  } catch (error) {
    console.error("🔴Error creating fund account:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

export { payout, contact, fundAccount };
