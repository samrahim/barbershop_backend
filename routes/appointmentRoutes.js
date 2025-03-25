const express = require("express");
const db = require("../database/db");
const router = express.Router();

// 📌 Add an appointment and notify the barber
router.post("/book", (req, res) => {
    console.log("we called");

    const { barber_id, client_name, client_phone, appointment_date, appointment_time } = req.body;

    db.run(
        `INSERT INTO Appointments (barber_id, client_name, client_phone, appointment_date, appointment_time) VALUES (?, ?, ?, ?, ?)`,
        [barber_id, client_name, client_phone, appointment_date, appointment_time],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const appointment_id = this.lastID;

            // Send notification to the barber via WebSockets
            if (global.io && global.barberSockets[barber_id]) {
                global.io.to(global.barberSockets[barber_id]).emit("newAppointment", {
                    appointment_id,
                    client_name,
                    client_phone,
                    appointment_date,
                    appointment_time,
                });
            }

            res.json({ message: "✅ Appointment booked!", appointment_id });
        }
    );
});

// 📌 Get all appointments for a barber
router.get("/:barber_id", (req, res) => {
    const { barber_id } = req.params;
    db.all(
        `SELECT * FROM Appointments WHERE barber_id = ? ORDER BY appointment_date, appointment_time`,
        [barber_id],
        (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(rows);
        }
    );
});

module.exports = router;
