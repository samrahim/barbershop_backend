const express = require('express');
const router = express.Router();
const Hairdresser = require('../database/models/hairdresser')

router.get('/hairdressers', async (req, res) => {
    try {
        const hairdressers = await Hairdresser.findAll();
        res.json(hairdressers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

module.exports = router;
