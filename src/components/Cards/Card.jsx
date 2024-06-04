import React, { useState, useEffect } from 'react';
import SpeedControl from '../SpeedControl/speed_control';  
import './Card.css';

const Card = (props) => {
  const { title, content, url, setEpisodeNumber, episodeNumber, fetchData } = props;
  const [epsNumber, setEpsNumber] = useState(episodeNumber);

  useEffect(() => {
    fetchData(epsNumber);
  }, [epsNumber, fetchData]);

  useEffect(() => {
    setEpsNumber(episodeNumber);
  }, [episodeNumber]);

  const handlePrevious = () => {
    setEpsNumber(epsNumber - 1);
    setEpisodeNumber(episodeNumber - 1);
  };

  const handleNext = () => {
    setEpsNumber(epsNumber + 1);
    setEpisodeNumber(episodeNumber + 1);
  };

  return (
    <div className="card custom-card">
      <img src="https://raw.githubusercontent.com/Avdhesh-Varshney/Chanakya/main/src/assets/Chanakya.webp" className="card-img" alt="Chanakya-Image" />
      <div className="card-img-overlay p-3">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{content}</p>
        <SpeedControl src={url} />
      </div>
    </div>
  );
}
 
export default Card;
