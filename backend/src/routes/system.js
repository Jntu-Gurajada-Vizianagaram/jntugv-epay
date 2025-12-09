const express = require("express");
const router = express.Router();
const systemController = require("../controllers/systemController");

router.get("/announcement", systemController.getAnnouncement);
router.get("/health", systemController.healthCheck);
router.get("/config", systemController.getConfig);
router.get("/maintenance", systemController.getMaintenanceStatus);
router.get("/notifications", systemController.getLiveNotification);
router.get("/health-full", systemController.fullHealthStatus);

module.exports = router;
