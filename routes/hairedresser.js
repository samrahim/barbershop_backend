const express = require('express');
const router = express.Router();
const Hairdresser = require('../database/models/hairdresser')
const WorkSchedule = require('../database/models/hairdresser_work_schedule')
const HairdresserOffDays = require('../database/models/off_days')
router.get('/hairdressers', async (req, res) => {
    try {
        const hairdressers = await Hairdresser.findAll();
        res.json(hairdressers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

const validDays = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];


const isValidTime = (time) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
const validDaysOrder = {
    "lundi": 1,
    "mardi": 2,
    "mercredi": 3,
    "jeudi": 4,
    "vendredi": 5,
    "samedi": 6,
    "dimanche": 7
};
const isValidSchedule = (start_day, start_time, end_day, end_time) => {
    const startDayOrder = validDaysOrder[start_day];
    const endDayOrder = validDaysOrder[end_day];


    if (endDayOrder < startDayOrder) {
        return false;
    }


    if (startDayOrder === endDayOrder && start_time >= end_time) {
        return false;
    }

    return true;
};

router.post('/:id/off-days', async (req, res) => {
    try {
        const { off_days } = req.body; // Tableau des jours de repos
        const hairdresser_id = req.params.id;

        if (!Array.isArray(off_days) || off_days.length === 0) {
            return res.status(400).json({ message: "Veuillez fournir un tableau de jours OFF." });
        }

        const records = off_days.map(day => ({ hairdresser_id, day_off: day }));
        await HairdresserOffDays.bulkCreate(records);

        res.status(201).json({ message: "Jours OFF enregistrés avec succès." });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", error });
    }
});


// router.post('/work-schedule/:id', async (req, res) => {
//     try {
//         const { hairdresser_id, schedule } = req.body;


//         const hairdresser = await Hairdresser.findByPk(hairdresser_id);
//         if (!hairdresser) return res.status(404).json({ error: "Coiffeur introuvable" });


//         for (const slot of schedule) {
//             const { start_day, start_time, end_day, end_time } = slot;


//             if (!validDays.includes(start_day) || !validDays.includes(end_day)) {
//                 return res.status(400).json({ error: "Jour invalide" });
//             }
//             if (!isValidTime(start_time) || !isValidTime(end_time)) {
//                 return res.status(400).json({ error: "Format d'heure invalide (HH:MM)" });
//             }

//             if (!isValidSchedule(start_day, start_time, end_day, end_time)) {
//                 return res.status(400).json({
//                     error: `Créneau invalide : ${start_day} ${start_time} - ${end_day} ${end_time}`
//                 });
//             }
//             const existingSlot = await WorkSchedule.findOne({
//                 where: { hairdresser_id, start_day, start_time, end_day, end_time }
//             });

//             if (existingSlot) {
//                 return res.status(400).json({ error: `Créneau déjà enregistré : ${start_day} ${start_time} - ${end_day} ${end_time}` });
//             }


//             await WorkSchedule.create({
//                 hairdresser_id,
//                 start_day,
//                 start_time,
//                 end_day,
//                 end_time
//             });
//         }

//         res.status(201).json({ message: "Planning mis à jour avec succès" });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Erreur serveur" });
//     }
// })

module.exports = router;
