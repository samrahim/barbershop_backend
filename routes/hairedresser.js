const express = require('express');
const router = express.Router();
const Hairdresser = require('../database/models/hairdresser')
const WorkSchedule = require('../database/models/hairdresser_work_schedule')
const HairdresserOffDays = require('../database/models/off_days')
const Appointment = require('../database/models/appointment')
const Service = require("../database/models/service")
const moment = require('moment');
router.get('/hairdressers', async (req, res) => {
    try {
        const hairdressers = await Hairdresser.findAll();
        res.json(hairdressers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// const daysMap = {
//     "samedi": 0,
//     "dimanche": 1,
//     "lundi": 2,
//     "mardi": 3,
//     "mercredi": 4,
//     "jeudi": 5,
//     "vendredi": 6,
// };

router.post('/:id/off-days', async (req, res) => {
    try {
        const hairdresser_id = req.params.id;
        const { off_day } = req.body;

        if (!hairdresser_id || !off_day || !off_day.repeat) {
            return res.status(400).json({
                error: "i dont know ??????",
                day: off_day?.day || "day not found",
                repeat: off_day?.repeat || "not found"
            });
        }

        await HairdresserOffDays.create({
            hairdresser_id,
            day_off: off_day.day,
            is_recurring: off_day.repeat
        });

        res.status(201).json({ message: "created" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
});

router.get('/:id/availability', async (req, res) => {
    try {
        const hairdresser_id = req.params.id;
        const { start_date, end_date } = req.query;

        const startDate = new Date(start_date || new Date());
        const endDate = new Date(end_date || new Date(startDate));
        endDate.setDate(endDate.getDate() + 15);

        const offDays = await HairdresserOffDays.findAll({
            where: { hairdresser_id },
            attributes: ['day_off', 'is_recurring'],
            raw: true
        });



        const recurringOffDays = offDays
            .filter(d => d.is_recurring)
            .map(d => new Date(d.day_off).toLocaleDateString('fr-FR', { weekday: 'long' }).toLowerCase());

        const specificOffDays = offDays
            .filter(d => !d.is_recurring)
            .map(d => new Date(d.day_off).toISOString().split('T')[0]);

        const dates = [];

        for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
            const dayName = date.toLocaleDateString('fr-FR', { weekday: 'long' }).toLowerCase();
            const dateString = date.toISOString().split('T')[0];

            dates.push({
                day: dateString,
                available: !recurringOffDays.includes(dayName) && !specificOffDays.includes(dateString)
            });
        }

        res.json({
            hairdresser_id,
            dates
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

router.post('/:id/createservice', async (req, res) => {
    const hairdresser_id = req.params.id
    const serviceName = req.body['name']
    const servicePrice = req.body['price']
    const serviceDuration = req.body['duration']

    if (!hairdresser_id || !serviceName || !servicePrice) {
        return res.json({ "err": "All field required" })
    }
    try {
        await Service.create(
            {
                hairdresser_id,
                name: serviceName,
                price: servicePrice,
                duration: serviceDuration || null
            }
        ).then((r) => {
            return res.json({ "message": "Service created" })
        })

    } catch (error) {
        return res.json({ "err": error })
    }
})



router.post('/:id/work-schedule', async (req, res) => {
    try {
        const hairdresser_id = req.params.id;
        const { schedule, duration } = req.body;
        console.log(schedule);

        if (!schedule) {
            return res.json({ "error": "schedule is requiredddddddd" })
        }
        const hairdresser = await Hairdresser.findByPk(hairdresser_id);
        if (!hairdresser) {
            return res.status(404).json({ error: "Coiffeur introuvable" });
        }


        const offDaysRecords = await HairdresserOffDays.findAll({
            where: { hairdresser_id },
            attributes: ['day_off'],
            raw: true
        });

        const offDays = offDaysRecords.map(record => record.day_off.toLowerCase());

        for (const slot of schedule) {
            const { start_day, start_time, end_day, end_time } = slot;


            if (!moment(start_day, "YYYY-MM-DD", true).isValid() ||
                !moment(end_day, "YYYY-MM-DD", true).isValid()) {
                return res.status(400).json({ error: "Format de date invalide. Attendu: YYYY-MM-DD" });
            }


            if (!moment(start_time, "HH:mm", true).isValid() ||
                !moment(end_time, "HH:mm", true).isValid()) {
                return res.status(400).json({ error: "Format d'heure invalide. Attendu: HH:mm" });
            }


            const startDate = moment(start_day, "YYYY-MM-DD");
            const endDate = moment(end_day, "YYYY-MM-DD");

            if (startDate.isAfter(endDate)) {
                return res.status(400).json({ error: "start_day ne peut pas être après end_day" });
            }


            const startTime = moment(start_time, "HH:mm");
            const endTime = moment(end_time, "HH:mm");
            if (startDate.isSame(endDate) && !startTime.isBefore(endTime)) {
                return res.status(400).json({ error: "Pour le même jour, start_time doit être avant end_time" });
            }



            if (offDays.includes(start_day.toLowerCase()) || offDays.includes(end_day.toLowerCase())) {
                return res.status(400).json({ error: `Jour off (${start_day} ou ${end_day})` });
            }


            await WorkSchedule.create({
                hairdresser_id,
                start_day,
                start_time,
                end_day,
                end_time,
                duration
            });
        }

        res.status(201).json({ message: "Planning créé avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});
router.get('/:id/planing', async (req, res) => {
    const hairdresser_id = req.params.id;
    const start_day = req.query.start_day;
    console.log("start day--------------->", start_day);

    WorkSchedule.findAll({
        where: {
            hairdresser_id: hairdresser_id,
            start_day: start_day
        }
    })
        .then((r) => {
            console.log(r);

            return res.json(r)
        })
        .catch((error) => res.status(500).json({ error: error.message }));
});

module.exports = router;
