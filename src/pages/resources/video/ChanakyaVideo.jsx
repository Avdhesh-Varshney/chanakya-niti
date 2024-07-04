import React, { useState } from 'react';
import './ChanakyaVideo.css'; // Adjust the import path

const ChanakyaVideo = () => {
  const [videoId, setVideoId] = useState('yIehOJylev8'); // Default video ID

  const videos = {
    chanakya: {
      title: 'Chanakya Niti',
      videoIds: [
        { id: 'yIehOJylev8', name: 'Chanakya Niti - 1' },
        { id: 'jgyxbWEDqdg', name: 'Chanakya Niti - 2' },
        { id: 'wSrHcynTf0c', name: 'Chanakya Niti - 3' },
        { id: 'Oxq3O7xafxE', name: 'Chanakya Niti - 4' }
      ],
    },
  };

  const handleVideoChange = (id) => {
    setVideoId(id);
  };

  return (
    <div className="container">
      <h1 className="title">Chanakya's Video</h1>
      <div className="video-container">
        <iframe 
          width="560" 
          height="315" 
          src={`https://www.youtube.com/embed/${videoId}`} 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>
      <div className="video-list">
        <h3>Choose a Video:</h3>
        <ul>
          {videos.chanakya.videoIds.map((video) => (
            <li key={video.id}>
              <button className="video-button1" onClick={() => handleVideoChange(video.id)}>
                {video.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChanakyaVideo;
