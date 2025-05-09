const express = require('express');
const axios = require('axios');
const router = express.Router();

// Use environment variable for API key
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = 'UCWwH9Hg56k97Ze3gSFG8sRQ';

router.get('/latest-videos', async (req, res) => {
  try {
    console.log('Fetching latest YouTube videos...');
    const videosRes = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          part: 'snippet',
          channelId: CHANNEL_ID,
          maxResults: 3,
          order: 'date',
          type: 'video',
          key: YOUTUBE_API_KEY,
        },
      }
    );
    console.log('YouTube API response:', videosRes.data);
    const videos = (videosRes.data.items || []).map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
    }));
    res.json({ videos });
  } catch (err) {
    console.error('YouTube API error:', err.response?.data || err.message);
    res.json({ videos: [] });
  }
});

module.exports = router;
