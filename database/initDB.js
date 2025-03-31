const sequelize = require('./db');
const service = require('./models/service')
const appointment = require('./models/appointment')
const client = require('./models/client')
const hairdresser_availability = require('./models/hairdresser_availability')
const times_slot = require('./models/times_slot')
const hairdresser = require("./models/hairdresser");





const initDb = async () => {
    try {
        await sequelize.sync({ force: false });
        const adminExists = await hairdresser.findOne({ where: { is_admin: true } });

        if (!adminExists) {
            await hairdresser.create({
                name: "rahim",
                is_admin: true,
                rating: 5,
                image: "default.png"
            });
            console.log(" Admin created");
        }

    } catch (error) {
        console.error('Error DB:', error);
    }
};

module.exports = initDb;
