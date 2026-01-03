module.exports = (sequelize, DataTypes) => {
    const AffiliationFeeDetail = sequelize.define("AffiliationFeeDetail", {
        paymentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "payments",
                key: "transaction_id",
            },
            onDelete: "CASCADE",
        },
        college_code: { type: DataTypes.STRING, allowNull: true },
        college_name: { type: DataTypes.STRING, allowNull: true },
        affiliation_type: {
            type: DataTypes.STRING, // GENERAL, RENEWAL, INSPECTION
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    AffiliationFeeDetail.associate = (models) => {
        AffiliationFeeDetail.belongsTo(models.Payment, { foreignKey: "paymentId" });
    };

    return AffiliationFeeDetail;
};
