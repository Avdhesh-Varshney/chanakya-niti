import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../css/Video.css";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const SEARCH_QUERY = 'chanakya niti, chanakya, story of chanakya, chanakya life';
const MAX_RESULTS = 9;

const ChanakyaVideo = () => {
  const [videos, setVideos] = useState([]);
  const [visibleVideos, setVisibleVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');

  useEffect(() => {
    fetchVideos(); 
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${MAX_RESULTS}&q=${SEARCH_QUERY}&regionCode=IN&type=video&key=${API_KEY}&pageToken=${nextPageToken}`
      );
      const fetchedVideos = response.data.items;
      setVideos(prevVideos => [...prevVideos, ...fetchedVideos]);
      setNextPageToken(response.data.nextPageToken);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleLoadMore = () => {
    fetchVideos();
  };

  useEffect(() => {
   
    setVisibleVideos(videos.slice(0, visibleVideos.length + 3));
  }, [videos, nextPageToken]);

  const rows = Math.ceil(visibleVideos.length / 3); 

  return (
    <div className="chanakya-video-container">
      <h1 className="video-header">Chanakya Niti & Chanakya Videos</h1>
      <div className="video-list">
        {visibleVideos.map((video, index) => (
          <div key={video.id.videoId} className="video-item">
            <iframe
              title={video.snippet.title}
              width="360"
              height="202.5"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h2>{video.snippet.title}</h2>
            <p>{video.snippet.description}</p>
          </div>
        ))}
      </div>
      {rows * 3 < videos.length && (
        <div className="pagination">
          <button className="pagination-btn" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ChanakyaVideo;
