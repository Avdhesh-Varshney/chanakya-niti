import React from 'react'
import Card from '../../components/shared/Card';

const News = () => {
  return (
    <div>
      <Card 
        imgSrc="/src/assets/image.webp" 
        title="Chanakya Niti" 
        description="Hello World" 
        path="/resources/news/chanakya" 
        btnName="Read Chanakya's News" 
      />
    </div>
  )
}

export default News;
