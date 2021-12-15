const { DataTypes } = require('sequelize');
export const OfferModel = {
    monthly_payment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    down_payment: {
        type: DataTypes.STRING,
        allowNull: true
    },
    required_payment_to_salary_ratio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    admin_fees: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mortgage_term_length: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    early_payment_amount: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    interest_rate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // founder: {
    //     type: DataTypes.TEXT,
    //     allowNull: false,
    //     get: function () {
    //         return JSON.stringify(this.getDataValue('founder'));
    //     },
    //     set: function (value) {
    //         this.setDataValue('founder', (value));
    //     },
    // }
}