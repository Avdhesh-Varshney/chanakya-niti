import React from 'react';
import { useParams } from 'react-router-dom';

const VideoDetail = () => {
  const { videoId } = useParams();

  const videos = {
    chanakya: {
      title: 'Chanakya Niti',
      videoUrl: 'https://www.youtube.com/embed/yIehOJylev8',
    },
    newVideo1: {
      title: 'New Video 1',
      videoUrl: 'https://www.youtube.com/embed/jgyxbWEDqdg',
    },
  };

  const video = videos[videoId];

  return (
    <div>
      {video ? (
        <>
          <h1>{video.title}</h1>
          <iframe
            width="560"
            height="315"
            src={video.videoUrl} // Embedding the videoUrl directly in src attribute
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </>
      ) : (
        <p>Video not found</p>
      )}
    </div>
  );
};

export default VideoDetail;
