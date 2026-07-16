const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  hero: {
    label: String,
    title: String,
    subtitle: String,
  },
  services: [
    {
      number: String,
      title: String,
      description: String,
      features: [String],
      imageUrl: String,
      imageAlt: String,
    },
  ],
  cta: {
    title: String,
    email: String,
    btnText: String,
  },
});

module.exports = mongoose.model('Service', serviceSchema);
