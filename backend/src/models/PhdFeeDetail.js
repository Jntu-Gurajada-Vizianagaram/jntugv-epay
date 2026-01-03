module.exports = (sequelize, DataTypes) => {
    const PhdFeeDetail = sequelize.define("PhdFeeDetail", {
        paymentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "payments", // Lowercase table name
                key: "transaction_id",
            },
            onDelete: "CASCADE",
        },
        department: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fee_type: {
            type: DataTypes.STRING, // TUITION, ADMISSION
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    PhdFeeDetail.associate = (models) => {
        PhdFeeDetail.belongsTo(models.Payment, { foreignKey: "paymentId" });
    };

    return PhdFeeDetail;
};
