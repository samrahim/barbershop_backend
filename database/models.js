const db = require('./db');

// Create tables
db.serialize(() => {
    // 🏠 Barbershop Admin (Owner)
    db.run(`CREATE TABLE IF NOT EXISTS Admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )`);

    // 💈 Barbers (Each admin can have multiple barbers)
    db.run(`CREATE TABLE IF NOT EXISTS Barbers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        admin_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        profile_image TEXT DEFAULT NULL,
        phone TEXT UNIQUE NOT NULL,
        FOREIGN KEY(admin_id) REFERENCES Admins(id) ON DELETE CASCADE
    )`);

    // 📆 Appointments (Linked to a barber)
    db.run(`CREATE TABLE IF NOT EXISTS Appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        barber_id INTEGER NOT NULL,
        client_name TEXT NOT NULL,
        client_phone TEXT NOT NULL,
        appointment_date TEXT NOT NULL,
        appointment_time TEXT NOT NULL,
        status TEXT DEFAULT 'pending',  -- 'pending', 'confirmed', 'cancelled'
        FOREIGN KEY(barber_id) REFERENCES Barbers(id) ON DELETE CASCADE
    )`);

    console.log("✅ Tables created successfully.");
});

module.exports = db;
