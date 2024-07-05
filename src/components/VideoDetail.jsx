import React from "react";
import { useParams } from "react-router-dom";
import videoData from "../pages/resources/videoData";

const VideoDetail = () => {
  const { videoId } = useParams();
  const video = videoData.find(v => v.id === videoId);
  console.log('Rendering VideoDetail', video);


  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <div>
      <h1>{video.title}</h1>
      <p>{video.description}</p>
      <iframe 
        width="560" 
        height="315" 
        src={video.url} 
        title={video.title} 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoDetail;
