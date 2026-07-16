const mongoose = require('mongoose');

const workDetailSchema = new mongoose.Schema({
  slug: { type: String, unique: true },
  clientName: String,
  title: String,
  services: [String],
  visitUrl: String,
  images: {
    gridFull: [String],
    gridHalf: [String],
  },
  socialImages: [String],
  eventSeries: {
    title: String,
    paragraphs: [String],
    images: [String],
  },
  moreWork: [
    {
      title: String,
      imageUrl: String,
    },
  ],
  ctaTitle: String,
});

module.exports = mongoose.model('WorkDetail', workDetailSchema);
