// const { Transaction } = require('../models');
// const { encryptPayload, decryptPayload } = require('../utils/crypto');
// const { v4: uuidv4 } = require('uuid');
// const axios = require('axios');

// const SBI_PAYMENT_URL = process.env.SBI_PAYMENT_URL; // For testing points to /mock-bank/payment
// const MERCHANT_ID = process.env.SBI_MERCHANT_ID || 'TEST_MERCHANT';
// const APP_BASE = process.env.APP_BASE_URL || 'http://localhost:5173';

// async function createPayment(body) {
//   // create merchant txn id
//   const merchantTxnId = `JNTU-${Date.now()}-${Math.floor(Math.random()*9999)}`;

//   const tx = await Transaction.create({
//     merchant_txn_id: merchantTxnId,
//     student_roll: body.student_roll,
//     student_name: body.student_name || '',
//     amount: body.amount,
//     currency: 'INR',
//     status: 'INITIATED',
//     raw_request: JSON.stringify(body)
//   });

//   const payload = {
//     merchantId: MERCHANT_ID,
//     merchantTxnId,
//     amount: String(body.amount),
//     currency: 'INR',
//     returnUrl: `${APP_BASE}/payment/return`,
//     callbackUrl: `${APP_BASE.replace(/^http:/,'http:').replace(/^https:/,'http:')}/api/pay/callback`, // will be consumed by bank (for mock, same server)
//     customerDetail: {
//       name: body.student_name || '',
//       roll: body.student_roll,
//       email: body.email || '',
//       mobile: body.mobile || ''
//     },
//     txnDate: new Date().toISOString()
//   };

//   // For test: we will POST the payload directly to SBI_PAYMENT_URL (mock) as form data
//   // If encryption required, use encryptPayload() — bank docs decide.
//   let encRequest = null;
//   try {
//     encRequest = encryptPayload(payload);
//   } catch (e) {
//     // If keys not configured, fallback to JSON string so mock can still work
//     encRequest = JSON.stringify(payload);
//   }

//   tx.raw_request = encRequest;
//   await tx.save();

//   // Return the action and fields to auto-post from frontend
//   return {
//     action: SBI_PAYMENT_URL,
//     fields: {
//       merchantId: MERCHANT_ID,
//       encRequest,
//       amount: String(body.amount),
//       returnUrl: payload.returnUrl,
//       callbackUrl: payload.callbackUrl
//     }
//   };
// }

// async function clientReturn(req, res) {
//   // Browser return: show a friendly page or JSON
//   // Browser return is not authoritative; server callback is authoritative
//   return res.json({ message: 'Browser returned. Please wait for confirmation from bank (server callback).' , body: req.body || req.query });
// }

// async function serverCallback(req, res) {
//   // Bank server -> server callback (JSON). For test the mock bank sends plain JSON.
//   try {
//     const payload = req.body;
//     // payload may be encrypted string in production; handle decryption if needed
//     // Example: if payload.encResponse exists -> decrypt
//     let parsed = payload;
//     if (payload.encResponse) {
//       try {
//         const dec = decryptPayload(payload.encResponse);
//         parsed = JSON.parse(dec);
//       } catch (err) {
//         console.warn('decrypt failed', err.message);
//       }
//     }

//     const merchantTxnId = parsed.merchantTxnId || parsed.orderId || parsed.merchant_txn_id;
//     const bankTxnId = parsed.bankTxnId || parsed.txnId || parsed.transactionId;
//     const status = (parsed.status || parsed.txnStatus || '').toUpperCase();

//     const tx = await Transaction.findOne({ where: { merchant_txn_id: merchantTxnId }});
//     if (!tx) {
//       console.warn('Transaction not found for merchantTxnId', merchantTxnId);
//       // respond 200 so bank doesn't retry too often
//       return res.status(200).send('OK');
//     }

//     if (tx.status === 'SUCCESS') {
//       return res.status(200).send('OK');
//     }

//     if (status.includes('SUCCESS') || String(parsed.responseCode) === '0') {
//       tx.status = 'SUCCESS';
//       tx.bank_txn_id = bankTxnId || parsed.bankTxnId || parsed.transactionId;
//       tx.raw_response = JSON.stringify(parsed);
//       tx.settled_at = new Date();
//     } else {
//       tx.status = 'FAILED';
//       tx.bank_txn_id = bankTxnId;
//       tx.raw_response = JSON.stringify(parsed);
//     }
//     await tx.save();

//     return res.status(200).send('OK');
//   } catch (err) {
//     console.error('callback processing error', err);
//     return res.status(500).send('ERROR');
//   }
// }

// module.exports = { createPayment, clientReturn, serverCallback };


const paymentService = require("../services/paymentService");

exports.initiatePayment = async (req, res) => {
  try {
    console.log("INITIATE PAYLOAD:", req.body);
    const data = await paymentService.initiate(req.body);
    res.json(data);
  } catch (err) {
    console.error("Initiate Payment Error", err);
    res.status(500).json({ error: "Failed to initiate payment" });
  }
};

exports.callbackHandler = async (req, res) => {
  try {
    await paymentService.callback(req.body);
    res.json({ status: "OK" });
  } catch (err) {
    console.error("Callback Error", err);
    res.status(500).json({ error: "Callback failed" });
  }
};

exports.getPaymentStatus = async (req, res) => {
  try {
    const merchantTxnId = req.params.merchantTxnId;
    const status = await paymentService.getStatus(merchantTxnId);
    res.json(status);
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch status" });
  }
};
