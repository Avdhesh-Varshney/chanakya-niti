
import React, { useState, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Card.css';

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

      <div className="card custom-card bg-light-subtle">

        <img src="https://images.tv9telugu.com/wp-content/uploads/2023/10/chanakya-motivational-quotes.jpg"
             className="card-img w-full  object-cover mb-1 rounded-lg " alt="Chanakya-Image" />
        <AudioPlayer
            src={url}
            onClickPrevious={epsNumber > 1 ? handlePrevious : undefined}
            onClickNext={handleNext}
            customAdditionalControls={[]}
            customVolumeControls={[]}
            showDownloadProgress={[]}
            className='audio-player bg-pink'
            showSkipControls={true}
            style={{ color: "white" }}
        />
          <div className="card-content p-2 font-semibold">
              <div className="episode-number text-xl font-semibold">Episode {epsNumber}</div>
              <p className="card-text text-base font-semibold text-black">{content}</p>
          </div>
      </div>
  );
}

export default Card;
