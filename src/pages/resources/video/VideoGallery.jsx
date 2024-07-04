import React from 'react';
import Card from '../../../components/shared/Card';

const VideoGallery = () => {
  const videos = [
    {
      id: 'chanakya',
      title: 'Chanakya Niti',
      description: 'A video about Chanakya Niti',
      imgSrc: '/src/assets/image1.webp',
      btnName: "Watch Chanakya's Story",
    },
    {
      id: 'newVideo1',
      title: 'New Video 1',
      description: 'Description for new video 1',
      imgSrc: '/src/assets/image2.webp',
      btnName: "Watch New Video 1",
    },
  ];

  return (
    <div>
      {videos.map((video) => (
        <Card
          key={video.id}
          imgSrc={video.imgSrc}
          title={video.title}
          description={video.description}
          path={`/resources/video/${video.id}`}
          btnName={video.btnName}
        />
      ))}
    </div>
  );
};

export default VideoGallery;
