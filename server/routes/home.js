const express = require('express');
const router = express.Router();
const Home = require('../models/Home');

router.get('/', async (req, res) => {
  try {
    const home = await Home.findOne();
    if (!home) return res.status(404).json({ error: 'Home data not found' });
    res.json(home);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
