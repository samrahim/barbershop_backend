const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Client = sequelize.define('Client', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    birthdate: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Client;
