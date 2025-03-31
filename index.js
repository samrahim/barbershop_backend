const express = require('express');
const initDb = require('./database/initDB');
const hairdresserRoutes = require('./routes/hairedresser');
const AppointmentStatus = require('./database/models/apoiment_status')
const app = express();
app.use(express.json());


app.use('/api', hairdresserRoutes);
initDb();


app.get("/", (req, res) => {
    res.send("Bienvenue dans l'application de gestion du salon de coiffure !");
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
