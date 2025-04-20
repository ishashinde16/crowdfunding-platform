import mysql from "mysql2"

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "isha",
    database: "crowdfunding"
})

db.connect((err) => {
    if (err) {
      console.error("MySQL connection failed:", err.message);
    } else {
      console.log("✅ Connected to MySQL database!");
    }
  });