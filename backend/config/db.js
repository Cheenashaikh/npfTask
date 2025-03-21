const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "hr1",
  port: 3304,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL Database Connected Successfully!");
    connection.release(); // Release the connection
  } catch (error) {
    console.error("❌ MySQL Connection Failed:", error.message);
    console.error("Error Code:", error.code);
    console.error("Error Message:", error.message);
  }
})();

module.exports = pool;
