import React from 'react'
import Data from '../Data';
import Card from './Card'

const CardsBox = () => {
  const data = Data();

  return (
    <div className="d-flex flex-wrap align-content-around justify-content-evenly">
      {data.map(({ episodeNumber, content, url }, index) => (
        <Card key={index} title={`Episode ${episodeNumber}`} content={content} url={url} />
      ))}
    </div>
  )
}

export default CardsBox
