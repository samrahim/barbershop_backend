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

router.get('/customizedates/:id', async (req, res) => {
    const hairdresserId = req.params['id']
    try {
        const hairdresser = await Hairdresser.findByPk(hairdresserId);
        res.json(hairdresser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
    res.send(`${hairdresserId}  dsafsdf`)
})

module.exports = router;
