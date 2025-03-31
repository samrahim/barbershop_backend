const { DataTypes } = require('sequelize');
const sequelize = require('../db')
const Client = require('./client')
const Hairdresser = require('./hairdresser');
const AppointmentStatus = require('./apoiment_status')


const Appointment = sequelize.define('Appointment', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    date: { type: DataTypes.STRING, allowNull: false },
    total_price: { type: DataTypes.FLOAT, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: true }
});


Appointment.belongsTo(Client, { foreignKey: 'client_id' });
Appointment.belongsTo(Hairdresser, { foreignKey: 'hairdresser_id' });
Appointment.belongsTo(AppointmentStatus, { foreignKey: 'status_id', onDelete: 'SET NULL' });
module.exports = Appointment;
