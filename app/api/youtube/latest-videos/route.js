export async function GET() {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = 'UCWwH9Hg56k97Ze3gSFG8sRQ';
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=3&order=date&type=video&key=${YOUTUBE_API_KEY}`;
  const res = await fetch(url);

  const data = await res.json();

  // Return the full response for debugging
  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
