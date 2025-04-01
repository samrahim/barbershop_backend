const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Hairdresser = require('./hairdresser');

const HairdresserOffDays = sequelize.define('HairdresserOffDays', {
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
    day_off: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    is_recurring: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    timestamps: false
});

Hairdresser.hasMany(HairdresserOffDays, { foreignKey: 'hairdresser_id', onDelete: 'CASCADE' });
HairdresserOffDays.belongsTo(Hairdresser, { foreignKey: 'hairdresser_id' });

module.exports = HairdresserOffDays;
