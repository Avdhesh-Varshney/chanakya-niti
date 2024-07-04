import React from 'react'
import Card from '../../../components/shared/Card';

const Book = () => {
  return (
    <div>
      <Card 
        imgSrc="/src/assets/image.webp" 
        title="Chanakya Niti" 
        description="Hello World" 
        path="/resources/book/chanakya" 
        btnName="Read Chanakya's Story" 
      />
    </div>
  )
}

export default Book;
