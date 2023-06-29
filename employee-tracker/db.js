const mysql = require('mysql2');

function createConnection() {
  const connection = mysql.createConnection({
    host: 'localhost', // Replace with your MySQL host
    port: 3306, // Replace with your MySQL port
    user: 'root', // Replace with your MySQL username
    password: '3218927', // Replace with your MySQL password
    database: 'employee_tracker' // Replace with your database name
  });

  return connection;
}

module.exports = {
  createConnection
};