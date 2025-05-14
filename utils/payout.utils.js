import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const razorpayAuth = {
  username: process.env.RAZORPAY_KEY_ID,
  password: process.env.RAZORPAY_KEY_SECRET,
};

async function createContact(contactData) {
  const res = await axios.post(
    "https://api.razorpay.com/v1/contacts",
    contactData,
    {
      auth: razorpayAuth,
    }
  );

  console.log(res.data);
  return res.data;
}

async function createFundAccount(data) {
  try {
    const response = await axios.post(
      "https://api.razorpay.com/v1/fund_accounts",
      data,
      {
        auth: razorpayAuth,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "🔴 Error creating fund account:",
      error?.response?.data || error.message
    );
    throw error?.response?.data || error;
  }
}

async function createPayout(data) {
  try {
    const payload = {
      account_number: process.env.RAZORPAY_ACCOUNT_NUMBER, // your virtual account number
      ...data,
    };

    const response = await axios.post(
      "https://api.razorpay.com/v1/payouts",
      payload,
      {
        auth: razorpayAuth,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "🔴 Error in createPayout:",
      error?.response?.data || error.message
    );
    throw error?.response?.data || error;
  }
}

export { createContact, createFundAccount, createPayout };
