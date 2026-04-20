require("dotenv").config();
console.log("DATABASE_URL:", process.env.DATABASE_URL);
require("dotenv").config();
const { Pool } = require("pg");

const cleanUrl = (process.env.DATABASE_URL || "")
  .replace("&channel_binding=require", "")
  .replace("?sslmode=require", "")
  .replace("&sslmode=require", "");

const pool = new Pool({
  connectionString: cleanUrl,
  ssl: false,
});

async function setup() {
  console.log("🔌 Connecting to Neon PostgreSQL...");
  try {
    const ver = await pool.query("SELECT version()");
    console.log("✅ Connected:", ver.rows[0].version.split(",")[0]);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id         SERIAL PRIMARY KEY,
        name       VARCHAR(100) NOT NULL,
        email      VARCHAR(255) NOT NULL,
        subject    VARCHAR(200) NOT NULL,
        message    TEXT NOT NULL,
        ip_address VARCHAR(45)  DEFAULT 'unknown',
        is_read    BOOLEAN      DEFAULT FALSE,
        replied_at TIMESTAMP    DEFAULT NULL,
        created_at TIMESTAMP    DEFAULT NOW(),
        updated_at TIMESTAMP    DEFAULT NOW()
      )
    `);
    console.log("✅ contact_messages table created");

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_contact_is_read
        ON contact_messages(is_read, created_at DESC)
    `);
    console.log("✅ Index created");

    const check = await pool.query("SELECT COUNT(*) FROM contact_messages");
    console.log("✅ Table verified! Rows:", check.rows[0].count);
    console.log("\n🎉 Database ready! Now run: npm run dev\n");
  } catch (err) {
    console.error("❌ Setup failed:", err.message);
  } finally {
    await pool.end();
  }
}

setup();
