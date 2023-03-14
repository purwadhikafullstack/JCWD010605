const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost:3306',
  user: 'root',
  password: '',
  database: 'db_joystay'
});

connection.connect((error) => {
  if (error) throw error;
  console.log('Connected to MySQL database!');
});
