const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const AppointmentStatus = sequelize.define('AppointmentStatus', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: DataTypes.ENUM("confirmé", "en attente", "annulé"),
        allowNull: true
    },
    reason: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: false
});

module.exports = AppointmentStatus;
