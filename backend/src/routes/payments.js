const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/initiate", paymentController.initiatePayment);
router.post("/callback", paymentController.callbackHandler);
router.get("/payment-response/:merchantTxnId", paymentController.getPaymentStatus);

module.exports = router;