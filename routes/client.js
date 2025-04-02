const express = require('express');
const router = express.Router();
const HairdresserWorkSchedule = require('../database/models/hairdresser_work_schedule');
const appointment = require("../database/models/appointment")
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


router.post('/:clientId/:hairdresserId/createreservation', async (req, res) => {
    const clientId = req.params['clientId'];
    const hairdresserId = req.params['hairdresserId']
    // FIXME: create new appointment with start_statut en attente 
    // FIXME: notify the hairdresser with oneSignal that a new appointment has been created and he can accept or remove it  
})




module.exports = router;
