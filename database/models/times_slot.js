const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const HairdresserWorkSchedule = require('./hairdresser_work_schedule');

const TimeSlot = sequelize.define('TimeSlot', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    work_schedule_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: HairdresserWorkSchedule,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: false
    }
}, {
    timestamps: false
});

HairdresserWorkSchedule.hasMany(TimeSlot, { foreignKey: 'work_schedule_id', onDelete: 'CASCADE' });
TimeSlot.belongsTo(HairdresserWorkSchedule, { foreignKey: 'work_schedule_id' });

module.exports = TimeSlot;
