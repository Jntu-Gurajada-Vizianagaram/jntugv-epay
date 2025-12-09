const axios = require("axios");

exports.processMockPayment = async (req, res) => {
  try {
    const { merchantId, callbackUrl, returnUrl } = req.body;

    const payload = {
      merchantTxnId: "MOCK-" + Date.now(),
      bankTxnId: "BANK-" + Math.floor(Math.random() * 1000000),
      merchantId,
      status: "SUCCESS",
      amount: req.body.amount || "0.00",
    };

    // Send server callback
    axios.post(callbackUrl, payload).catch((e) =>
      console.warn("Mock callback failed:", e.message)
    );

    // Redirect browser (CSP-safe)
    res.send(`
      <html>
        <head>
          <meta http-equiv="refresh" content="0; url=${returnUrl}" />
        </head>
        <body>Redirecting...</body>
      </html>
    `);
  } catch (err) {
    console.error("Mock Bank Error:", err);
    res.status(500).send("Mock Bank Error");
  }
};
