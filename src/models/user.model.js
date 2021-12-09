const {  DataTypes } = require('sequelize');
export const UserModel = {
    // Model attributes are defined here
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    purchase_price: {
        type: DataTypes.STRING,
        allowNull: false
    },
    property_area: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_mortgage_amount: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_monthly_interest_rate:{
        type: DataTypes.STRING,
        allowNull: false
    },
    last_monthly_payment:{
        type: DataTypes.STRING,
        allowNull: false
    }
}
