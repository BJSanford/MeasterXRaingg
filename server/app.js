const express = require('express');
const app = express();
const youtubeRoutes = require('./routes/youtube');

app.use('/api/youtube', youtubeRoutes);

// ...existing code...

module.exports = app;