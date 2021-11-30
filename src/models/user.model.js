const {  DataTypes } = require('sequelize');
export const UserModel = {
    // Model attributes are defined here
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    email_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_name: {
        type: DataTypes.STRING
    },
    employment_status: {
        type: DataTypes.STRING
    },
}