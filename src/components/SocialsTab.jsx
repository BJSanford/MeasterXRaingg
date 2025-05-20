import React, { useEffect, useState } from 'react';

const SocialsTab = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('/api/youtube/latest-videos')
      .then((res) => res.json())
      .then((data) => setVideos(data.videos || []));
  }, []);

  return (
    <div>
      {/* ...existing socials content... */}
      <h2>Latest YouTube Videos</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {videos.map((video) => (
          <a
            key={video.id}
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <img src={video.thumbnail} alt={video.title} style={{ width: 240 }} />
            <div>
              <img src="/coin.png" alt="coin" style={{ width: 16, marginRight: 4 }} />
              {video.title}
            </div>
          </a>
        ))}
      </div>
      {/* ...existing socials content... */}
    </div>
  );
};

export default SocialsTab;