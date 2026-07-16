const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  hero: {
    videoUrl: String,
    subtitle: String,
    btnText: String,
    btnLink: String,
  },
  marqueeBrands: [String],
  bentoGrid: [
    {
      label: String,
      title: String,
      description: String,
      imageUrl: String,
      btnText: String,
      btnLink: String,
      bgColor: String,
      mediaType: { type: String, enum: ['image', 'video'], default: 'image' },
    },
  ],
  instagram: {
    title: String,
    handle: String,
    handleUrl: String,
    images: [String],
  },
});

module.exports = mongoose.model('Home', homeSchema);
