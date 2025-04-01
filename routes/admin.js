
const express = require('express');
const router = express.Router();
const sequelize = require('../database/db');


router.post("/diabletimesSlots", async (req, res) => {
    const { disabledays } = req.body;
    endDate.setDate(endDate.getDate() + 15);
})


module.exports = router;
