require("dotenv").config();
const { sequelize } = require("./src/models/index");

(async () => {
    try {
        console.log("Starting Manual Database Sync for Production...");
        // Force sync even in production
        await sequelize.authenticate();
        console.log("Authentication successful.");

        await sequelize.sync({ alter: true });
        console.log("✅ Database Synced Successfully (Tables Created/Updated).");
        process.exit(0);
    } catch (err) {
        console.error("❌ Sync Failed:", err);
        process.exit(1);
    }
})();
