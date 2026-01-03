module.exports = (sequelize, DataTypes) => {
    const ExamFeeDetail = sequelize.define("ExamFeeDetail", {
        paymentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "payments", // Lowercase table name
                key: "transaction_id",
            },
            onDelete: "CASCADE",
        },
        semester: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        year: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        exam_type: {
            type: DataTypes.STRING, // REGULAR, SUPPLEMENTARY
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    ExamFeeDetail.associate = (models) => {
        ExamFeeDetail.belongsTo(models.Payment, { foreignKey: "paymentId" });
    };

    return ExamFeeDetail;
};
