const express = require('express');
const axios = require('axios');
const router = express.Router();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
// Use the actual channel ID for MeasterCS_Skins
const CHANNEL_ID = 'UCWwH9Hg56k97Ze3gSFG8sRQ';

router.get('/latest-videos', async (req, res) => {
  try {
    // Fetch latest 3 videos from the channel
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
    const videos = (videosRes.data.items || []).map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
    }));
    res.json({ videos });
  } catch (err) {
    res.json({ videos: [] });
  }
});

module.exports = router;
