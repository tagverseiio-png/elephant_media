const express = require('express');
const router = express.Router();
const About = require('../models/About');

router.get('/', async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) return res.status(404).json({ error: 'About data not found' });
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
