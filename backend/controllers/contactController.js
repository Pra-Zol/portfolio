const { query } = require("../config/db");
const nodemailer = require("nodemailer");

// ── Send email notification to Prajwal ──
const sendEmailNotification = async (messageData) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("ℹ️  SMTP not configured — skipping email notification");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: "off.pklm10@gmail.com",
    subject: `📬 New Portfolio Message: ${messageData.subject}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;
                  background:#0a1628;color:#f0ece0;padding:32px;
                  border-radius:12px;border:1px solid #1a2e4a;">
        <h2 style="color:#c9a84c;margin-top:0;">New Message from Your Portfolio</h2>
        <hr style="border-color:#1a2e4a;margin:20px 0;"/>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#a8b4c8;width:80px;">Name:</td>
              <td style="padding:8px 0;color:#f0ece0;font-weight:bold;">${messageData.name}</td></tr>
          <tr><td style="padding:8px 0;color:#a8b4c8;">Email:</td>
              <td style="padding:8px 0;">
                <a href="mailto:${messageData.email}" style="color:#c9a84c;">${messageData.email}</a>
              </td></tr>
          <tr><td style="padding:8px 0;color:#a8b4c8;">Subject:</td>
              <td style="padding:8px 0;color:#f0ece0;">${messageData.subject}</td></tr>
        </table>
        <hr style="border-color:#1a2e4a;margin:20px 0;"/>
        <h4 style="color:#c9a84c;margin-bottom:12px;">Message:</h4>
        <p style="color:#a8b4c8;line-height:1.7;background:#050d1a;padding:16px;
                  border-radius:8px;border-left:3px solid #c9a84c;">
          ${messageData.message.replace(/\n/g, "<br/>")}
        </p>
        <p style="color:#5a6a80;font-size:12px;margin-top:20px;">
          Sent from prajwalkhanal.dev |
          ${new Date().toLocaleString("en-AU", { timeZone: "Australia/Sydney" })} AEDT
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent for message from ${messageData.name}`);
  } catch (err) {
    console.error(
      "⚠️  Email failed:",
      err.message,
      err.code,
      JSON.stringify(err),
    );
  }
};

// ── POST /api/contact — Save message ──
const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message)
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res
        .status(400)
        .json({ success: false, error: "Please enter a valid email address" });

    if (message.trim().length < 10)
      return res
        .status(400)
        .json({
          success: false,
          error: "Message must be at least 10 characters",
        });

    const ipAddress =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket?.remoteAddress ||
      "unknown";

    const result = await query(
      `INSERT INTO contact_messages (name, email, subject, message, ip_address)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, created_at`,
      [
        name.trim(),
        email.trim().toLowerCase(),
        subject.trim(),
        message.trim(),
        ipAddress,
      ],
    );

    const saved = result.rows[0];
    console.log(`✅ Message #${saved.id} saved from ${name} <${email}>`);

    // Fire-and-forget — don't block the response
    sendEmailNotification({ name, email, subject, message });

    res.status(201).json({
      success: true,
      message: "Thank you! I'll get back to you soon.",
      id: saved.id,
    });
  } catch (err) {
    console.error("Contact error:", err.message);
    res.status(500).json({
      success: false,
      error: "Failed to send. Please email: off.pklm10@gmail.com",
    });
  }
};

// ── GET /api/contact — All messages (admin) ──
const getMessages = async (req, res) => {
  try {
    if (req.headers["x-admin-key"] !== process.env.ADMIN_KEY)
      return res.status(401).json({ success: false, error: "Unauthorised" });

    const result = await query(
      `SELECT id, name, email, subject, message, is_read, replied_at, created_at
       FROM contact_messages ORDER BY created_at DESC`,
    );

    const messages = result.rows;
    res.json({
      success: true,
      count: messages.length,
      unread: messages.filter((m) => !m.is_read).length,
      messages,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// ── PATCH /api/contact/:id/read — Mark as read (admin) ──
const markAsRead = async (req, res) => {
  try {
    if (req.headers["x-admin-key"] !== process.env.ADMIN_KEY)
      return res.status(401).json({ success: false, error: "Unauthorised" });

    await query(
      `UPDATE contact_messages SET is_read = TRUE, updated_at = NOW() WHERE id = $1`,
      [req.params.id],
    );
    res.json({
      success: true,
      message: `Message #${req.params.id} marked as read`,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

module.exports = { submitContact, getMessages, markAsRead };
