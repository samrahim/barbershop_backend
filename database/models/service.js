const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Hairdresser = require('./hairdresser');

const Service = sequelize.define('Service', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    duration: { type: DataTypes.INTEGER, allowNull: false }
});


Service.belongsTo(Hairdresser, { foreignKey: 'hairdresser_id', onDelete: 'CASCADE' });
Hairdresser.hasMany(Service, { foreignKey: 'hairdresser_id' });

module.exports = Service;
