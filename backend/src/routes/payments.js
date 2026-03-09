const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

const { encryptData } = require("../utils/secureUrl");

router.post("/initiate", paymentController.initiatePayment);
router.get("/initiate", paymentController.initiatePaymentView);
router.post("/callback", paymentController.callbackHandler);
router.post("/sbipush-response", paymentController.callbackHandler);
router.get("/status/:merchantTxnId", paymentController.getPaymentStatus);
router.post("/decrypt", paymentController.decryptPaymentData);

// Handle browser return by redirecting to frontend
router.get("/return", paymentController.clientReturnHandler);

router.get("/payment-response/:merchantTxnId", paymentController.getPaymentStatus);

module.exports = router;