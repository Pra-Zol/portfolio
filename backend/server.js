// ============================================
// PRAJWAL KHANAL PORTFOLIO — BACKEND SERVER
// Node.js + Express + PostgreSQL
// ============================================

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

// Connect to PostgreSQL on startup (exits on failure)
require("./config/db");

const contactRoutes = require("./routes/contact");

const app = express();
const PORT = process.env.PORT || 5000;

// Security headers
app.use(helmet());

// CORS — allow React dev server + production URL
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://prajwalkhanal.vercel.app",
      "https://prajwalkhanal.com",
      "https://www.prajwalkhanal.com",
    ],
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  }),
);

// Rate limit the contact form to prevent spam
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: {
    success: false,
    error: "Too many requests, please try again later.",
  },
});

// Body parsers
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/contact", contactLimiter, contactRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Prajwal Khanal Portfolio API",
    database: "PostgreSQL",
    timestamp: new Date().toISOString(),
  });
});

// 404
app.use((req, res) => res.status(404).json({ error: "Route not found" }));

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

// Start
app.listen(PORT, () => {
  console.log("🚀 Server running on http://localhost:" + PORT);
  console.log("📧 Contact API: http://localhost:" + PORT + "/api/contact");
  console.log("❤️  Health:     http://localhost:" + PORT + "/api/health");
});

module.exports = app;
