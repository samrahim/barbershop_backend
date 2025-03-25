const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
require('./database/models');
const db = require("./database/db");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: { origin: "*" },
});

app.use(express.json());

// Store connected barbers globally
global.barberSockets = {};
global.io = io; // ✅ Make io accessible globally

// WebSocket connection handling
io.on("connection", (socket) => {
    console.log("🟢 A user connected:", socket.id);

    // Barber joins their room
    socket.on("joinBarber", (barber_id) => {
        global.barberSockets[barber_id] = socket.id;
        console.log(`✂ Barber ${barber_id} connected with socket ${socket.id}`);
    });

    // Disconnect event
    socket.on("disconnect", () => {
        console.log("🔴 A user disconnected:", socket.id);
        for (const barber_id in global.barberSockets) {
            if (global.barberSockets[barber_id] === socket.id) {
                delete global.barberSockets[barber_id];
            }
        }
    });
});

app.use("/appointments", appointmentRoutes);

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
