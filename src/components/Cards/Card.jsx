import React, { useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Card.css';


const Card = (props) => {
  const { title, content, url, setEpisodeNumber, episodeNumber, fetchData, useEffect } = props;
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
    <>
      {/* <div className="custom-card">
        <img src="https://raw.githubusercontent.com/Avdhesh-Varshney/Chanakya/main/src/assets/Chanakya.webp" className="card-img" alt="Chanakya-Image" />
        <div className="card-img-overlay p-3">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{content}</p>
        </div>
      </div> */}
      <div className='d-flex flex-column align-items-center'>

        <div className="card" style={{ maxWidth: "18rem" }}>
          <img src="https://miro.medium.com/v2/resize:fit:350/0*EXGUepXEI4YWTcab.jpg" className="card-img" alt="" />
          <div className="card-img-overlay">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{content}</p>
          </div>
        </div>
        <div className='audio-player' >
          <AudioPlayer
            src={url}
            onClickPrevious={epsNumber > 1 ? handlePrevious : undefined}
            onClickNext={handleNext}
            customAdditionalControls={[]}
            customVolumeControls={[]}
            showDownloadProgress={[]}
            className='my-2 py-4'
            showSkipControls={true}
            style={{ color: "white" }}
          />

        </div>
      </div>
      

    </>
  );
}

export default Card;
