import React, { useState } from 'react';
import LoadingBar from 'react-top-loading-bar';
import RequestEpisode from './components/Pages/RequestEpisode';
import './App.css';

function App() {
  const [value, setValue] = useState(1);
  const [episodeNumber, setEpisodeNumber] = useState(1);
  const [startPlayback, setStartPlayback] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleOnChange = (event) => {
    const newValue = parseInt(event.target.value);
    if (newValue > 0) {
      setValue(newValue);
    } else {
      setValue(1);
    }
  };
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setEpisodeNumber(value);
      setStartPlayback(true);
    }
  };

  return (
    <div className='container'>
      <LoadingBar height={4} color='#f11946' progress={progress} />
      <h1 className='display-1 text-center my-2'>
        <img src="https://raw.githubusercontent.com/Avdhesh-Varshney/Chanakya/main/src/assets/Chanakya.png" alt="Chanakya-Image" style={{ width: '5rem' }} />
        चाणक्य नीति
      </h1>
      <div className="row g-3 text-center align-items-center justify-content-center mb-5">
        <h5>Enter episode number and press enter to start the player.</h5>
        <div className="col-auto">
          <label htmlFor="inputNumber" className="col-form-label">Episode Number</label>
        </div>
        <div className="col-auto">
          <input type="number" id="inputNumber" className="form-control" value={value} onKeyDown={handleKeyPress} onChange={handleOnChange} />
        </div>
      </div>
      {startPlayback && <RequestEpisode episodeNumber={episodeNumber} setProgress={setProgress} />}
    </div>
  );
}

export default App;
