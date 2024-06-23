import React from 'react'
import Card from '../../components/shared/Card';

const Audio = () => {
  return (
    <div>
      <Card 
        imgSrc="../src/assets/image.webp" 
        title="Chanakya Niti" 
        description="Hello World" 
        path="/resources/audio/ChanakyaNiti" 
        btnName="Listen Chanakya's Story" 
      />
    </div>
  )
}

export default Audio;
