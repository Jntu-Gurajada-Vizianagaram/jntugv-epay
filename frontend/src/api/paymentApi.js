// const axios = require("axios");
import axios from "axios";
export async function initiatePayment(payload) {
  const res = await axios.post("/api/pay/initiate", payload);
  return res.data;
}

export async function getPaymentStatus(merchantTxnId) {
  const res = await axios.get(`/api/pay/payment-response/${merchantTxnId}`);
  return res.data;
}

export async function mockBankCallback(callbackData) {
  const res = await axios.post("/api/pay/callback", callbackData);
  return res.data; // { status: "OK" }
}

