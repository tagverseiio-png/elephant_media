const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  hero: {
    title: String,
    subtitle: String,
  },
  categories: [
    {
      category: String,
      mainBrand: String,
      hasIcon: Boolean,
      slug: String,
      otherBrands: [String],
      color: String,
      imageUrl: String,
    },
  ],
  offerSection: {
    title: String,
    btnText: String,
    btnLink: String,
  },
});

module.exports = mongoose.model('Work', workSchema);
