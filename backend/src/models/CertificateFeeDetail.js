module.exports = (sequelize, DataTypes) => {
    const CertificateFeeDetail = sequelize.define("CertificateFeeDetail", {
        paymentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "payments", // Lowercase table name
                key: "transaction_id",
            },
            onDelete: "CASCADE",
        },
        certificate_type: {
            type: DataTypes.STRING, // OD, PC, CMM
            allowNull: true,
        },
        college_code: { type: DataTypes.STRING, allowNull: true },
        college_name: { type: DataTypes.STRING, allowNull: true },
        approval_letter_ref: { type: DataTypes.STRING, allowNull: true }, // Verification Ref / Doc ID
        purpose: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    CertificateFeeDetail.associate = (models) => {
        CertificateFeeDetail.belongsTo(models.Payment, { foreignKey: "paymentId" });
    };

    return CertificateFeeDetail;
};
