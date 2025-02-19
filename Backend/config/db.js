const mysql = require("mysql2/promise");
const queries = require("./queries"); // Import the queries array

// Create a connection pool with promises enabled
const pool = mysql.createPool({
  host: "localhost",
  user: "root", // Use your database username
  password: "", // Use your database password
  database: "donor_patient",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Execute queries on pool initialization
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to the database");

    for (let query of queries) {
      try {
        await connection.execute(query); // Use promise-based execute
        console.log("Query executed successfully");
      } catch (err) {
        console.error("Error executing query:", err.message);
      }
    }

    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
  }
})();

module.exports = pool; // Export the promise-based pool
