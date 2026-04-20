const express = require('express');
const router = express.Router();
const { submitContact, getMessages, markAsRead } = require('../controllers/contactController');

// POST   /api/contact          — Submit a contact message (public)
router.post('/', submitContact);

// GET    /api/contact          — Get all messages (admin-protected)
router.get('/', getMessages);

// PATCH  /api/contact/:id/read — Mark a message as read (admin-protected)
router.patch('/:id/read', markAsRead);

module.exports = router;
