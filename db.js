// db.js
const pg = require('pg');
require('dotenv').config(); // .env 파일 불러오기

const { Pool } = pg

const db = new Pool ({
  connectionString: process.env.DATABASEURL,
  ssl: { rejectUnauthorized: false }
})

module.exports = db;
