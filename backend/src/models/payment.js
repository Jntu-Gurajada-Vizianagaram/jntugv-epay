module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define("Payment", {
    transaction_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    merchantTxnId: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    payment_category: {
      type: DataTypes.STRING(50), // UNIVERSITY_EXAMINATION, PHD_FEE, CERTIFICATE
      allowNull: false,
    },
    payment_type: {
      type: DataTypes.STRING(100), // REGULAR, SUPPLEMENTARY, OD, CMM etc
      allowNull: true
    },
    // Student Core Details
    student_roll: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    student_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    father_name: { type: DataTypes.STRING(150), allowNull: true },
    study_status: { type: DataTypes.STRING(100), allowNull: true }, // e.g., "PURSUING", "COMPLETED"
    email: { type: DataTypes.STRING(100) },
    mobile: { type: DataTypes.STRING(20) },

    // Academic Details
    college_code: { type: DataTypes.STRING(50) },
    college_name: { type: DataTypes.STRING(255) },
    branch_code: { type: DataTypes.STRING(50) },
    branch_name: { type: DataTypes.STRING(150) },
    course: { type: DataTypes.STRING(100) }, // B.Tech, M.Tech, PhD
    current_year: { type: DataTypes.STRING(20) }, // I, II, III etc
    semester: { type: DataTypes.STRING(20) },     // I, II

    // Financials
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: { type: DataTypes.STRING(10), defaultValue: "INR" },

    // Status & Gateway
    status: {
      type: DataTypes.ENUM('INITIATED', 'PENDING', 'SUCCESS', 'FAILED', 'REFUNDED'),
      defaultValue: "INITIATED",
    },
    bankTxnId: { type: DataTypes.STRING(100) },
    payment_mode: { type: DataTypes.STRING(50) }, // DEBIT_CARD, UPI, etc - from gateway
    gateway_response: { type: DataTypes.TEXT }, // Full JSON response for audit

    // Timestamps handled by Sequelize (createdAt, updatedAt)
  }, {
    tableName: 'payments',
    timestamps: true
  });

  return Payment;
};
