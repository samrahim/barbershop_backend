const express = require("express");
const db = require("../database/db");
const router = express.Router();
const OneSignal = require('onesignal-node');


const oneSignalClient = new OneSignal.Client(process.env.ONESIGNAL_APP_ID, process.env.ONESIGNAL_API_KEY)

router.post("/book", (req, res) => {
    const { barber_id, client_name, client_phone, appointment_date, appointment_time } = req.body;

    db.run(
        `INSERT INTO Appointments (barber_id, client_name, client_phone, appointment_date, appointment_time) VALUES (?, ?, ?, ?, ?)`,
        [barber_id, client_name, client_phone, appointment_date, appointment_time],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const appointment_id = this.lastID;


            const notification = {
                contents: { en: `📅 Nouveau rendez-vous avec ${client_name} le ${appointment_date} à ${appointment_time}` },
                include_external_user_ids: [String(barber_id)] // 📌 Envoie au barbier spécifique
            };

            // 📌 Envoyer la notification
            oneSignalClient.createNotification(notification)
                .then(response => {
                    console.log("✅ Notification envoyée avec succès :", response.body);
                })
                .catch(error => {
                    console.error("❌ Erreur d'envoi de la notification :", error);
                });
            res.json({ message: "Rendez-vous reserve !", appointment_id });
        }
    );
});

module.exports = router;