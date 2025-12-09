module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define("Payment", {
    merchantTxnId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    student_roll: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    student_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fee_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    payment_category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "INITIATED",
    },
    bankTxnId: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });

  return Payment;
};
