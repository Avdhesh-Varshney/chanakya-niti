import React, { useState, useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar';
import RequestEpisode from './components/Pages/RequestEpisode';
import Alert from './components/Alert/Alert';
import './App.css';
import QuoteSection from './components/Quotes/QuotesSection';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { options } from './assets/options.js';


function App() {
  const [value, setValue] = useState(1);
  const [episodeNumber, setEpisodeNumber] = useState(1);
  const [startPlayback, setStartPlayback] = useState(false);
  const [progress, setProgress] = useState(0);
  const [alert, setAlert] = useState(null);

  const handleOnChange = (event) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue)) {
      setValue(newValue);
    } else {
      setValue('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setEpisodeNumber(value);
      setStartPlayback(true);
    }
  };

  const handleKey = (e) => {
    setEpisodeNumber(value);
    setStartPlayback(true);
  };

  useEffect(() => {
    showAlert("To begin, input the episode number and press Enter.");
  }, []);

  const showAlert = (message) => {
    setAlert({
      msg: message
    })
     setTimeout(() => {
       setAlert(null);
     }, 3500);
  }

  return (
    <div className='container'>
      <LoadingBar height={4} color='#f11946' progress={progress} />
      {alert && <Alert alert={alert} />}

      <h1 className='display-1 text-center my-2'>
        <img src="https://raw.githubusercontent.com/Avdhesh-Varshney/Chanakya/main/src/assets/Chanakya-Logo.webp" alt="Chanakya-Image" style={{ width: '5rem' }} />
        चाणक्य नीति
      </h1>
      <QuoteSection/>


      <div className="row g-3 text-center align-items-center justify-content-center mb-5">
        <div className="col-auto">
          <label htmlFor="inputNumber" className="col-form-label">Episode Number</label>
        </div>

        <div className="col-auto">
          <Autocomplete
            disablePortal
            className="bg-white"

            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField onSelect={handleOnChange} onChange={handleOnChange} {...params} label="Input Ep.1 to 806 (Finale)" />}
          />
          
        </div>
        <div className='col-auto'>
          <button
            onClick={handleKey}
            className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded"
          >
            Enter
          </button>
        </div>
      </div>

      <div className="info-button-container">
        <button className="info-button">
          i
        </button>
        <div className="info-box">
          <p>Explore the life and teachings of Chanakya, an ancient Indian philosopher, economist, and political strategist. Learn about his contributions to Indian philosophy and political science.</p>
        </div>
      </div>
      
      {startPlayback && <RequestEpisode episodeNumber={episodeNumber} setEpisodeNumber={setEpisodeNumber} setProgress={setProgress} />}
    </div>
  );
}

export default App;
