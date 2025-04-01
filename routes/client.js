const express = require('express');
const router = express.Router();
const HairdresserWorkSchedule = require('../database/models/hairdresser_work_schedule');

const Service = require('../database/models/service');



router.get("/:id/service", async (req, res) => {
    const hairdresser_id = req.params.id

    const hairdresser_services = await Service.findAll({
        where: {
            hairdresser_id: hairdresser_id
        }
    })
    return res.json({ hairdresser_services })
})





module.exports = router;
