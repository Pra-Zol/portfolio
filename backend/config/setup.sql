-- ============================================
-- PORTFOLIO DATABASE SETUP
-- Run this once to create your table
-- ============================================

-- Create the contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100)  NOT NULL,
  email       VARCHAR(255)  NOT NULL,
  subject     VARCHAR(200)  NOT NULL,
  message     TEXT          NOT NULL,
  ip_address  VARCHAR(45)   DEFAULT 'unknown',
  is_read     BOOLEAN       DEFAULT FALSE,
  replied_at  TIMESTAMP     DEFAULT NULL,
  created_at  TIMESTAMP     DEFAULT NOW(),
  updated_at  TIMESTAMP     DEFAULT NOW()
);

-- Index for fast lookup of unread messages
CREATE INDEX IF NOT EXISTS idx_contact_is_read
  ON contact_messages(is_read, created_at DESC);

-- Confirm table was created
SELECT 'contact_messages table ready ✅' AS status;
