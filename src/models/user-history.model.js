const { DataTypes } = require('sequelize');
export const UserHistoryModel = {
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    purchase_price: {
        type: DataTypes.STRING,
        allowNull: false
    },
    property_area: {
        type: DataTypes.STRING,
        allowNull: true
    },
    user_down_payment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_salary: {
        type: DataTypes.STRING,
        allowNull: false
    }
}