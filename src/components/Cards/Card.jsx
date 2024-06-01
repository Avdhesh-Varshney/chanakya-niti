import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Card = (props) => {
  const { title, content, url } = props;

  return (
    <div className="card bg-white text-bg-light" style={{ width: '18rem' }}>
      <img src="https://raw.githubusercontent.com/Avdhesh-Varshney/Chanakya/main/src/assets/Chanakya.webp" className="card-img" alt="Chanakya-Image" />
      <div className="card-img p-3">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{content}</p>
        <AudioPlayer
          src={url}
          customAdditionalControls={[]}
          customVolumeControls={[]}
          showDownloadProgress={[]}
          className='bg-transparent'
        />
      </div>
    </div>
  );
}

export default Card;
