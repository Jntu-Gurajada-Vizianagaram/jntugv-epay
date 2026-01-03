const db = require("../models");
const Payment = db.Payment;

exports.initiate = async (data) => {

  const merchantTxnId = "JNTUGV-" + Date.now();

  /* Create Base Payment Record */
  const payment = await Payment.create({
    merchantTxnId,
    student_roll: data.student_roll,
    student_name: data.student_name,
    father_name: data.father_name,
    study_status: data.study_status,
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

  /* Create Specific Fee Details based on Category/Type */
  if (data.payment_category === "UNIVERSITY_EXAMINATION") {
    await db.ExamFeeDetail.create({
      paymentId: payment.transaction_id,
      semester: data.semester,
      year: data.year,
      exam_type: data.payment_subtype, // REGULAR, SUPPLEMENTARY etc
      description: data.remarks
    });
  } else if (data.payment_category === "PHD_FEE") {
    await db.PhdFeeDetail.create({
      paymentId: payment.transaction_id,
      department: data.department,
      fee_type: data.fee_type, // TUITION, ADMISSION etc
      description: data.remarks
    });
  } else if (data.payment_category === "CERTIFICATE") {
    await db.CertificateFeeDetail.create({
      paymentId: payment.transaction_id,
      certificate_type: data.payment_subtype,
      college_code: data.college_code,
      college_name: data.college_name,
      approval_letter_ref: data.approval_letter_ref,
      description: data.remarks
    });
  } else if (data.payment_category === "ADMISSION") {
    await db.AdmissionFeeDetail.create({
      paymentId: payment.transaction_id,
      admission_ref: data.student_roll, // "NEW_ADMISSION" or similar
      course: data.course,
      branch: data.branch,
      category: data.category,
      gender: data.gender,
      dob: data.dob,
      aadhar: data.aadhar,
      address: data.address,
      description: data.remarks
    });
  } else if (data.payment_category === "AFFILIATION") {
    await db.AffiliationFeeDetail.create({
      paymentId: payment.transaction_id,
      college_code: data.student_roll, // In affiliation form, 'student_roll' holds 'code'
      college_name: data.student_name, // 'student_name' holds 'collegeName'
      affiliation_type: data.payment_subtype,
      description: data.remarks
    });
  }

  // FIXED URL
  const cleanUrl = (url) => (url ? url.replace(/\/$/, "") : "");

  let actionUrl = cleanUrl(process.env.SBI_PAYMENT_URL);

  // Guard against infinite loop misconfiguration (if actionUrl points to /api/payment/initiate)
  if (!actionUrl || actionUrl.includes("/api/payment/initiate")) {
    console.warn("WARNING: SBI_PAYMENT_URL is misconfigured (points to itself). Using Mock Bank.");
    actionUrl = `${process.env.API_URL}/api/mock-bank/payment`;
  }

  // SBI_PUSH_URL is the official term for the server-to-server callback
  const callbackUrl = cleanUrl(process.env.SBI_PUSH_URL) || cleanUrl(process.env.CALLBACK_URL) || `${process.env.API_URL}/api/payment/callback`;
  const returnUrl = cleanUrl(process.env.RETURN_URL) || `${process.env.API_URL}/api/payment/return`;

  console.log("ACTION URL:", actionUrl);

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
