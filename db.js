// db.js
const mysql = require('mysql2/promise');
require('dotenv').config(); // .env 파일 불러오기

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10
});

module.exports = db;
