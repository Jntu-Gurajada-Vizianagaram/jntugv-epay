const db = require("../models");
const Payment = db.Payment;

exports.initiate = async (data) => {

  const merchantTxnId = "JNTUGV-" + Date.now();

  await Payment.create({
    merchantTxnId,
    student_roll: data.student_roll,
    student_name: data.student_name,
    email: data.email,
    mobile: data.mobile,
    year: data.year,
    college_code: data.college_code,
    college_name: data.college_name,
    branch_code: data.branch_code,
    branch_name: data.branch_name,
    course: data.course,
    roll_number: data.roll_number,
    payment_type: data.payment_type,
    payment_category: data.payment_category,
    amount: data.amount,
    status: "INITIATED"
  });

  // FIXED URL
  const cleanUrl = (url) => (url ? url.replace(/\/$/, "") : "");

  let actionUrl = cleanUrl(process.env.SBI_PAYMENT_URL);

  // Guard against infinite loop misconfiguration (if actionUrl points to /api/pay/initiate)
  if (!actionUrl || actionUrl.includes("/api/pay/initiate")) {
    console.warn("WARNING: SBI_PAYMENT_URL is misconfigured (points to itself). Using Mock Bank.");
    actionUrl = `${process.env.API_URL}/api/mock-bank/payment`;
  }

  const callbackUrl = cleanUrl(process.env.CALLBACK_URL) || `${process.env.API_URL}/api/pay/callback`;
  const returnUrl = cleanUrl(process.env.RETURN_URL) || `${process.env.API_URL}/payment/return`;

  console.log("ACTION URL:", actionUrl);  // Must not be undefined

  return {
    action: actionUrl,
    merchantTxnId,
    fields: {
      merchantId: process.env.SBI_MERCHANT_ID || "TESTMERCHANT",
      encRequest: "ENCRYPTED",
      merchantTxnId,
      amount: String(data.amount),
      callbackUrl,
      returnUrl
    }
  };
};

exports.callback = async (body) => {
  const txn = await Payment.findOne({
    where: { merchantTxnId: body.merchantTxnId },
  });

  if (!txn) return;

  txn.status = body.status;
  txn.bankTxnId = body.bankTxnId;
  await txn.save();
};

exports.getStatus = async (merchantTxnId) => {
  return await Payment.findOne({ where: { merchantTxnId } });
};
