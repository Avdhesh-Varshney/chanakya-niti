import React from 'react'
import Card from '../../components/shared/Card';

const Video = () => {
  return (
    <div>
      <Card 
        imgSrc="/src/assets/image.webp" 
        title="Chanakya Niti" 
        description="Hello World" 
        path="/resources/video/chanakya" 
        btnName="Watch Chanakya's Story" 
      />
    </div>
  )
}

export default Video;
