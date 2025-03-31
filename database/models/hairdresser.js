const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Hairdresser = sequelize.define('Hairdresser', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    is_admin: { type: DataTypes.BOOLEAN, defaultValue: false },
    rating: { type: DataTypes.FLOAT, defaultValue: 0 },
    image: { type: DataTypes.STRING, allowNull: true },
    backGroundimage: { type: DataTypes.STRING, allowNull: true }
});

module.exports = Hairdresser;
