const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const HairdresserAvailability = require('./hairdresserAvailability');

const TimeSlot = sequelize.define('TimeSlot', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    availability_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: HairdresserAvailability,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    start_time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    end_time: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

HairdresserAvailability.hasMany(TimeSlot, { foreignKey: 'availability_id', onDelete: 'CASCADE' });
TimeSlot.belongsTo(HairdresserAvailability, { foreignKey: 'availability_id' });

module.exports = TimeSlot;