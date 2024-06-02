import React, { useState, useEffect } from 'react';
import SpeedControl from '../SpeedControl/speed_control'; 
import 'react-h5-audio-player/lib/styles.css';
import '../SpeedControl/speed_control.css'; 
import './card.css'; 

const Card = (props) => {
  const { title, content, url, setEpisodeNumber, episodeNumber, fetchData } = props;
  const [epsNumber, setEpsNumber] = useState(episodeNumber);
  
  useEffect(() => {
    fetchData(epsNumber);
  }, [epsNumber]);

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
    <div className="card bg-white text-bg-light" style={{ width: '18rem' }}>
      <img src="https://raw.githubusercontent.com/Avdhesh-Varshney/Chanakya/main/src/assets/Chanakya.webp" className="card-img" alt="Chanakya-Image" />
      <div className="card-img p-3">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{content}</p>
        <SpeedControl src={url} />
        <div className="d-flex justify-content-between mt-3">
          <button onClick={handlePrevious} disabled={epsNumber <= 1} className="custom-button">Previous</button>
          <button onClick={handleNext} className="custom-button">Next</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
