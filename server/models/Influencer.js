const mongoose = require('mongoose');

const influencerSchema = new mongoose.Schema({
  heroTitle: String,
  heroText: String,
  items: [
    {
      brand: String,
      title: String,
      category: String,
      imageUrl: String,
    },
  ],
});

module.exports = mongoose.model('Influencer', influencerSchema);
