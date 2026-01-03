module.exports = (sequelize, DataTypes) => {
    const AdmissionFeeDetail = sequelize.define("AdmissionFeeDetail", {
        paymentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "payments",
                key: "transaction_id",
            },
            onDelete: "CASCADE",
        },
        admission_ref: { type: DataTypes.STRING, allowNull: true }, // Usually same as roll in "NEW_ADMISSION" or temp id
        course: { type: DataTypes.STRING, allowNull: true },
        branch: { type: DataTypes.STRING, allowNull: true },
        category: { type: DataTypes.STRING, allowNull: true }, // OC, BC, etc
        gender: { type: DataTypes.STRING, allowNull: true },
        dob: { type: DataTypes.STRING, allowNull: true },
        aadhar: { type: DataTypes.STRING, allowNull: true },
        address: { type: DataTypes.TEXT, allowNull: true },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    AdmissionFeeDetail.associate = (models) => {
        AdmissionFeeDetail.belongsTo(models.Payment, { foreignKey: "paymentId" });
    };

    return AdmissionFeeDetail;
};
