const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const Home = require('../models/Home');
const About = require('../models/About');
const Service = require('../models/Service');
const Influencer = require('../models/Influencer');
const Work = require('../models/Work');
const WorkDetail = require('../models/WorkDetail');
const Feedback = require('../models/Feedback');

const verifyToken = require('../middleware/auth');

// Setup multer for local media uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../media');
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\\s+/g, '-')}`);
  }
});
const upload = multer({ storage });

// All routes here are protected
router.use(verifyToken);

// Upload Endpoint
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const API_BASE = process.env.API_URL || 'http://localhost:4000';
    
    // Check if the uploaded file is a video
    const isVideo = req.file.mimetype.startsWith('video/');
    
    if (isVideo) {
      const originalPath = req.file.path;
      const optimizedFilename = `opt-${req.file.filename}.mp4`;
      const optimizedPath = path.join(req.file.destination, optimizedFilename);
      
      // We don't wait for FFmpeg to finish in the synchronous request flow because
      // large videos might timeout the HTTP request. We will run it in the background
      // and return the *future* optimized URL immediately.
      // Or, since it's an admin dashboard and we probably want to wait, we can wait.
      // But let's return a Promise to wait so the frontend knows when it's actually done.
      
      ffmpeg(originalPath)
        .output(optimizedPath)
        .videoCodec('libx264')
        .outputOptions([
          '-preset fast',
          '-crf 28',         // Good balance of compression and quality
          '-movflags faststart' // Optimize for web streaming
        ])
        .on('end', () => {
          // Delete the original uncompressed file to save space
          fs.unlink(originalPath, (err) => { if (err) console.error(err); });
          const url = `${API_BASE}/media/${optimizedFilename}`;
          res.json({ url });
        })
        .on('error', (err) => {
          console.error('FFmpeg error:', err);
          // Fallback to original if compression fails
          const url = `${API_BASE}/media/${req.file.filename}`;
          res.json({ url });
        })
        .run();
    } else {
      // It's an image or other file, return immediately
      const url = `${API_BASE}/media/${req.file.filename}`;
      res.json({ url });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Generic Update Function
const updateSingleton = (Model) => async (req, res) => {
  try {
    const data = req.body;
    // Assuming there's only one document for Home, About, etc.
    let doc = await Model.findOne();
    if (!doc) {
      doc = new Model(data);
    } else {
      Object.assign(doc, data);
    }
    await doc.save();
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Routes
router.put('/home', updateSingleton(Home));
router.put('/about', updateSingleton(About));
router.put('/services', updateSingleton(Service));
router.put('/influencers', updateSingleton(Influencer));
router.put('/work', updateSingleton(Work));

// Work Details (Array of documents)
router.get('/work-details', async (req, res) => {
  try {
    const works = await WorkDetail.find();
    res.json(works);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/work-details', async (req, res) => {
  try {
    const doc = new WorkDetail(req.body);
    await doc.save();
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/work-details/:slug', async (req, res) => {
  try {
    const doc = await WorkDetail.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true, upsert: true });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/work-details/:slug', async (req, res) => {
  try {
    await WorkDetail.findOneAndDelete({ slug: req.params.slug });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Feedback Management
router.get('/feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/feedbacks/:id', async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
