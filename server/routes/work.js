const express = require('express');
const router = express.Router();
const Work = require('../models/Work');

router.get('/', async (req, res) => {
  try {
    const data = await Work.findOne();
    if (!data) return res.status(404).json({ error: 'Work data not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
