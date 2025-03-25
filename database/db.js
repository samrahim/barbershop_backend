const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error("❌ Error opening database:", err.message);
    } else {
        console.log("✅ Database connected successfully");
    }
});

module.exports = db;
