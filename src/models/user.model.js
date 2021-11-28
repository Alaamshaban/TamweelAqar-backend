const {  DataTypes } = require('sequelize');
export const UserModel = {
    // Model attributes are defined here
    user_name: {
        type: DataTypes.STRING
    },
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
    email_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING
    },
    gender: {
        type: DataTypes.STRING
    },
    date_of_birth: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    nationality: {
        type: DataTypes.STRING
    },
    employment_status: {
        type: DataTypes.STRING
    },
}