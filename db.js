// db.js
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',          // MySQL 사용자 이름
  password: 'Hh980131!',   // MySQL 비밀번호
  database: 'simple_board', // 위에서 만든 데이터베이스 이름
  connectionLimit: 10
});

module.exports = db;
