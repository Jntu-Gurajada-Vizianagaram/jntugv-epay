const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

const { encryptData } = require("../utils/secureUrl");

router.post("/initiate", paymentController.initiatePayment);
router.post("/callback", paymentController.callbackHandler);
router.post("/sbipush-response", paymentController.callbackHandler);
router.get("/status/:merchantTxnId", paymentController.getPaymentStatus);
router.post("/decrypt", paymentController.decryptPaymentData);

// Handle browser return by redirecting to frontend with encrypted data
router.get("/return", (req, res) => {
    const frontendBase = process.env.APP_BASE_URL || "http://localhost:5173";

    // Encrypt the query parameters to hide them from URL history
    const encrypted = encryptData(req.query);

    // Redirect with single 'data' param
    res.redirect(`${frontendBase}/payment/success?data=${encrypted}`);
});

router.get("/payment-response/:merchantTxnId", paymentController.getPaymentStatus);

module.exports = router;