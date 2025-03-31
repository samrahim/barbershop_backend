const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Hairdresser = require('./hairdresser');

const HairdresserAvailability = sequelize.define('HairdresserAvailability', {
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
    day_of_week: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    start_time: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^([01]\d|2[0-3]):([0-5]\d)$/
        }
    },
    end_time: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^([01]\d|2[0-3]):([0-5]\d)$/
        }
    }
}, {
    timestamps: false
});

Hairdresser.hasMany(HairdresserAvailability, { foreignKey: 'hairdresser_id', onDelete: 'CASCADE' });
HairdresserAvailability.belongsTo(Hairdresser, { foreignKey: 'hairdresser_id' });

module.exports = HairdresserAvailability;