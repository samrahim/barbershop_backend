const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'salon_coiffure.db',
    logging: true
});

module.exports = sequelize;