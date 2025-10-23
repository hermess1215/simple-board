// db.js
const mysql = require('mysql2/promise');
require('dotenv').config(); // .env 파일 불러오기

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'simple_board',
  connectionLimit: 10
});

module.exports = db;
