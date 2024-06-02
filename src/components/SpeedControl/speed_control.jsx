import React, { useRef, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './speed_control.css';

const SpeedControl = ({ src }) => {
  const audioRef = useRef(null);
  const [playbackRate, setPlaybackRate] = useState(1); 

  const changePlaybackRate = (rate) => {
    if (audioRef.current) {
      audioRef.current.audio.current.playbackRate = rate;
      setPlaybackRate(rate); 
    }
  };

  return (
    <div className="custom-audio-player">
      <AudioPlayer
        ref={audioRef}
        src={src}
        customAdditionalControls={[]}
        customVolumeControls={[]}
        showDownloadProgress={false}
        className='bg-transparent'
      />
      <div className="speed-controls">
        <button 
          onClick={() => changePlaybackRate(1)}
          className={playbackRate === 1 ? 'active' : ''}
        >
          1x
        </button>
        <button 
          onClick={() => changePlaybackRate(1.25)}
          className={playbackRate === 1.25 ? 'active' : ''}
        >
          1.25x
        </button>
        <button 
          onClick={() => changePlaybackRate(1.5)}
          className={playbackRate === 1.5 ? 'active' : ''}
        >
          1.5x
        </button>
        <button 
          onClick={() => changePlaybackRate(1.75)}
          className={playbackRate === 1.75 ? 'active' : ''}
        >
          1.75x
        </button>
        <button 
          onClick={() => changePlaybackRate(2)}
          className={playbackRate === 2 ? 'active' : ''}
        >
          2x
        </button>
      </div>
    </div>
  );
};

export default SpeedControl;
