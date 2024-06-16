
import React, { useState, useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar';
import RequestEpisode from './components/Pages/RequestEpisode';
import Alert from './components/Alert/Alert';
import './App.css';
import Navbar from './components/Navbar';

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function App() {
  const [value, setValue] = useState();
  const [episodeNumber, setEpisodeNumber] = useState(1);
  const [startPlayback, setStartPlayback] = useState(true);
  const [progress, setProgress] = useState(0);
  const [alert, setAlert] = useState(null);

  const handleOnChange = (event) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue)) {
      setValue(newValue);
    } else {
      setValue("");
    }
  };

  const handleKeyPress = (event) => {

    if (event.key === 'Enter') {

      if (value < 1) {
        showAlert("Enter valid episode");
        return;
      }
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


      <Navbar handleOnChange={handleOnChange} handleKeyPress={handleKeyPress} value={value} handleKey={handleKey} />
      {/* <QuoteSection/> */}


      <div className="info-button-container">
        <button className="info-button">
          i
        </button>
        <div className="info-box">
          <p>Explore the life and teachings of Chanakya, an ancient Indian philosopher, economist, and political strategist. Learn about his contributions to Indian philosophy and political science.</p>
        </div>
      </div>

      {startPlayback && <RequestEpisode episodeNumber={episodeNumber} setEpisodeNumber={setEpisodeNumber} setProgress={setProgress} showAlert={showAlert} />}

    </div>
  );
}

export default App;
