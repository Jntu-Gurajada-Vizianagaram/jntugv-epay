const express = require("express");
const router = express.Router();
const mockBankController = require("../controllers/mockBankController");

router.post("/payment", mockBankController.processMockPayment);
router.post("/confirm", mockBankController.confirmMockPayment);

module.exports = router;