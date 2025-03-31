const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Hairdresser = require('./hairdresser');

const HairdresserWorkSchedule = sequelize.define('HairdresserWorkSchedule', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    hairdresser_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Hairdresser,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    start_day: {
        type: DataTypes.STRING,
        allowNull: false
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    end_day: {
        type: DataTypes.STRING,
        allowNull: false
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: false
    }
}, {
    timestamps: false
});

Hairdresser.hasMany(HairdresserWorkSchedule, { foreignKey: 'hairdresser_id', onDelete: 'CASCADE' });
HairdresserWorkSchedule.belongsTo(Hairdresser, { foreignKey: 'hairdresser_id' });

module.exports = HairdresserWorkSchedule;
