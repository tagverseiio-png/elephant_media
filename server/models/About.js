const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  hero: {
    label: String,
    title: String,
  },
  mission: {
    label: String,
    paragraphs: [String],
  },
  values: [
    {
      title: String,
      description: String,
      icon: String,
    },
  ],
  team: [
    {
      name: String,
      role: String,
      gradient: String,
    },
  ],
  testimonial: {
    quote: String,
    authorName: String,
    authorRole: String,
  },
});

module.exports = mongoose.model('About', aboutSchema);
