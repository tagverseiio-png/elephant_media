const express = require('express');
const router = express.Router();
const WorkDetail = require('../models/WorkDetail');

router.get('/:slug', async (req, res) => {
  try {
    const data = await WorkDetail.findOne({ slug: req.params.slug });
    if (!data) return res.status(404).json({ error: 'Work detail not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
