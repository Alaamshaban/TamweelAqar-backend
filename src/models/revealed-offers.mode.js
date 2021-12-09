const { DataTypes } = require('sequelize');
export const RevealedOfferModel = {
    interest_rate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    monthly_payment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    offer_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    revealed_by: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    }
}