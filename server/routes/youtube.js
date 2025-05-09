const express = require('express');
const axios = require('axios');
const router = express.Router();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_USERNAME = 'MeasterCS_Skins';

router.get('/latest-videos', async (req, res) => {
  try {
    // Step 1: Get channel ID from username
    const channelRes = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels`,
      {
        params: {
          part: 'id',
          forUsername: CHANNEL_USERNAME,
          key: YOUTUBE_API_KEY,
        },
      }
    );
    const channelId = channelRes.data.items[0]?.id;
    if (!channelId) return res.status(404).json({ error: 'Channel not found' });

    // Step 2: Get latest videos
    const videosRes = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          part: 'snippet',
          channelId,
          maxResults: 3,
          order: 'date',
          type: 'video',
          key: YOUTUBE_API_KEY,
        },
      }
    );
    const videos = videosRes.data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
    }));
    res.json({ videos });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

module.exports = router;
