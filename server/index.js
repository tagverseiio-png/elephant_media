require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const homeRoutes = require('./routes/home');
const aboutRoutes = require('./routes/about');
const influencerRoutes = require('./routes/influencers');
const serviceRoutes = require('./routes/services');
const workRoutes = require('./routes/work');
const workDetailRoutes = require('./routes/workDetail');
const feedbackRoutes = require('./routes/feedback');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve media folder as static CDN
app.use('/media', express.static(path.join(__dirname, 'media')));

// API Routes
app.use('/api/home', homeRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/influencers', influencerRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/work', workRoutes);
app.use('/api/work', workDetailRoutes);
app.use('/api/feedback', feedbackRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
