const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const feedback = await Feedback.create({ name, email, phone, message });
    res.status(201).json({ success: true, data: feedback });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
