require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { sequelize } = require("./src/models");
const axios = require("axios");

const paymentRoutes = require("./src/routes/payments");
const systemRoutes = require("./src/routes/system");
const mockBankRoutes = require("./src/routes/mockbank");

const app = express();

// Security
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// API Routes
app.use("/api/pay", paymentRoutes);
app.use("/api/system", systemRoutes);
// app.use("/api/mock-bank", mockBankRoutes);

// Root
app.get("/", (req, res) => {
  res.json({ ok: true, app: "jntugv-payments-backend" });
});

// Start Server
const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected");

    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync({ alter: true });
      console.log("Database synced");
    }

    app.listen(PORT, () => {
      console.log("Backend running on port", PORT);
    });
  } catch (err) {
    console.error("Startup error", err);
    process.exit(1);
  }
})();

app.post("/mock-bank/payment", async (req, res) => {
  try {
    console.log("MOCKBANK: Payment request received:", req.body);

    const {
      merchantId,
      amount,
      callbackUrl,
      returnUrl
    } = req.body;

    // Generate sample bank response
    const payload = {
      merchantTxnId: "MOCK-" + Date.now(),
      bankTxnId: "BANK-" + Math.floor(Math.random() * 1000000),
      merchantId: merchantId || "TESTMERCHANT",
      status: "SUCCESS",
      amount: amount || "0.00",
      message: "Mock payment processed successfully"
    };

    console.log("MOCKBANK: Sending server callback →", callbackUrl);

    // SERVER-TO-SERVER callback
    axios.post(callbackUrl, payload, {
      headers: { "Content-Type": "application/json" }
    }).catch((err) => {
      console.error("MOCKBANK: Callback failed:", err.message);
    });

    // Browser redirect WITHOUT inline script (CSP safe)
    res.status(200).send(`
      <html>
        <head>
          <meta http-equiv="refresh" content="0; URL='${returnUrl}'" />
        </head>
        <body style="font-family:sans-serif;text-align:center;padding:2rem;">
          <h2>Mock Payment Successful</h2>
          <p>Redirecting back to merchant...</p>
        </body>
      </html>
    `);

  } catch (err) {
    console.error("MOCKBANK ERROR:", err);
    return res.status(500).send("Mock bank error");
  }
});


// -------------------------------------------
//  MOCK BANK GET RECEIPT / STATUS CHECK
// -------------------------------------------
app.get("/mock-bank/receipt/:txnId", (req, res) => {
  const txnId = req.params.txnId;

  // This is a STATIC mock response.
  // (Optional) You can pull real DB record if needed.
  res.json({
    status: "SUCCESS",
    txnId,
    amount: "0.00",
    message: "Mock receipt generated",
    timestamp: new Date()
  });
});
