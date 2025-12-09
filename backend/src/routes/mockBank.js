const express = require("express");
const router = express.Router();
const mockBankController = require("../controllers/mockBankController");

router.post("/payment", mockBankController.processMockPayment);

module.exports = router;