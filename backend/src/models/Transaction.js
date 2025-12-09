const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Transaction = sequelize.define('Transaction', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    merchant_txn_id: { type: DataTypes.STRING(128), allowNull: false, unique: true },
    student_roll: { type: DataTypes.STRING(64) },
    student_name: { type: DataTypes.STRING(255) },
    amount: { type: DataTypes.DECIMAL(12,2), allowNull: false },
    currency: { type: DataTypes.STRING(8), defaultValue: 'INR' },
    payment_mode: { type: DataTypes.STRING(32) },
    status: { type: DataTypes.ENUM('INITIATED','PENDING','SUCCESS','FAILED','REFUNDED'), defaultValue: 'INITIATED' },
    bank_txn_id: { type: DataTypes.STRING(128) },
    raw_request: { type: DataTypes.TEXT },
    raw_response: { type: DataTypes.TEXT },
    settled_at: { type: DataTypes.DATE },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'transactions',
    
    timestamps: false
  });

  return Transaction;
};
