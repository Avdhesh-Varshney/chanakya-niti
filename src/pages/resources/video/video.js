import React from 'react';
import { Link } from 'react-router-dom';
import videoData from '../../videoData';
// import '../../css/Video.css'; // Ensure you have the corresponding CSS file

const Video = () => {
  return (
    <div className="video-list">
      <h1>Video List</h1>
      <ul>
        {videoData.map(video => (
          <li key={video.id}>
            <Link to={`/resources/video/${video.id}`}>
              <h2>{video.title}</h2>
              <p>{video.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Video;
