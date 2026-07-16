const express = require('express');
const router = express.Router();
const Influencer = require('../models/Influencer');

router.get('/', async (req, res) => {
  try {
    const data = await Influencer.findOne();
    if (!data) return res.status(404).json({ error: 'Influencer data not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
