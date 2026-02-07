require("dotenv").config();
const { sequelize } = require("./src/models/index");

(async () => {
    try {
        console.log("🔄 [Production Sync] Connecting to Database...");
        await sequelize.authenticate();
        console.log("✅ Connection Successful.");

        // Sync Parent Table First
        console.log("🔄 Syncing 'Payment' Model (Parent)...");
        await sequelize.models.Payment.sync({ alter: true });
        console.log("✅ Payment Model Synced.");

        // Sync Child Tables
        const children = [
            "ExamFeeDetail",
            "PhdFeeDetail",
            "CertificateFeeDetail",
            "AdmissionFeeDetail",
            "AffiliationFeeDetail"
        ];

        for (const modelName of children) {
            console.log(`🔄 Syncing '${modelName}'...`);
            if (sequelize.models[modelName]) {
                await sequelize.models[modelName].sync({ alter: true });
                console.log(`✅ ${modelName} Synced.`);
            } else {
                console.warn(`⚠️ Model '${modelName}' not found in Sequelize instance.`);
            }
        }

        console.log("\n✅✅ ALL TABLES SYNCED SUCCESSFULLY ✅✅");
        process.exit(0);
    } catch (err) {
        console.error("❌ Sync Failed:", err);
        process.exit(1);
    }
})();
