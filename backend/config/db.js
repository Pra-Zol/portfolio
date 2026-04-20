const { Pool } = require("pg");
require("dotenv").config();

const url = new URL(process.env.DATABASE_URL);

const pool = new Pool({
  host: url.hostname,
  port: url.port || 5432,
  database: url.pathname.replace("/", ""),
  user: url.username,
  password: url.password,
  ssl: {
    rejectUnauthorized: false,
    require: true,
  },
});

pool.connect((err, client, release) => {
  if (err) {
    console.warn("⚠️  DB not connected:", err.code, err.message);
    return;
  }
  console.log("✅ PostgreSQL (Neon) connected successfully");
  release();
});

const query = (text, params) => pool.query(text, params);
module.exports = { pool, query };
