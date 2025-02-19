// db/queries.js
const queries = [
  `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      blood_group VARCHAR(5),
      address TEXT,
      age INT,
      role ENUM('Donor', 'Patient', 'Both') DEFAULT 'Both',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`,

  `CREATE TABLE IF NOT EXISTS user_credentials (
      mobile VARCHAR(15) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`,
];

module.exports = queries;
