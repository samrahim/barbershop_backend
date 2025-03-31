const sequelize = require('./db');
const service = require('./models/service')
const appointment = require('./models/appointment')
const client = require('./models/client')
const times_slot = require('./models/times_slot')
const hairdresser = require("./models/hairdresser");
const HairdresserWorkschedule = require('./models/hairdresser_work_schedule')
const offDays = require('./models/off_days')



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
