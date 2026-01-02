import axios from "axios";

// Helper to remove trailing slash from base URL
const getBaseUrl = () => {
  const url = import.meta.env.VITE_API_URL || "";
  return url.endsWith("/") ? url.slice(0, -1) : url;
};

// Create configured axios instance
export const apiClient = axios.create({
  baseURL: getBaseUrl(),
});

export async function initiatePayment(payload) {
  const res = await apiClient.post("/api/pay/initiate", payload);
  return res.data;
}

export async function getPaymentStatus(merchantTxnId) {
  const res = await apiClient.get(`/api/pay/payment-response/${merchantTxnId}`);
  return res.data;
}

export async function mockBankCallback(callbackData) {
  const res = await apiClient.post("/api/pay/callback", callbackData);
  return res.data;
}

