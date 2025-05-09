export async function GET() {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = 'UC3Umf_NrgeT2wA3g8K4rFig';
  // Fetch more than 3 to ensure we get 3 non-shorts
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=10&order=date&type=video&key=${YOUTUBE_API_KEY}`;
  const searchRes = await fetch(searchUrl);
  const searchData = await searchRes.json();

  const videoIds = (searchData.items || [])
    .filter(item => item.id && item.id.videoId)
    .map(item => item.id.videoId)
    .join(',');

  if (!videoIds) {
    return new Response(JSON.stringify({ videos: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Fetch video details to get duration
  const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`;
  const videosRes = await fetch(videosUrl);
  const videosData = await videosRes.json();

  // Helper to convert ISO 8601 duration to seconds
  function isoDurationToSeconds(iso) {
    const match = iso.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
    const minutes = match && match[1] ? parseInt(match[1]) : 0;
    const seconds = match && match[2] ? parseInt(match[2]) : 0;
    return minutes * 60 + seconds;
  }

  // Filter out shorts (duration < 60s)
  const videos = (videosData.items || [])
    .filter(item => {
      const duration = isoDurationToSeconds(item.contentDetails.duration);
      return duration >= 60;
    })
    .slice(0, 3)
    .map(item => ({
      id: item.id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
    }));

  return new Response(JSON.stringify({ videos }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
