import React, { useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import RequestEpisode from "./components/Pages/RequestEpisode";
import Alert from "./components/Alert/Alert";
import "./App.css";

function App() {
  const [value, setValue] = useState(0);
  const [episodeNumber, setEpisodeNumber] = useState(1);
  const [startPlayback, setStartPlayback] = useState(false);
  const [progress, setProgress] = useState(0);
  const [alert, setAlert] = useState(null);

  const handleOnChange = (event) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue)) {
      setValue(newValue);
      setEpisodeNumber(newValue); // Synchronize episodeNumber with input field value
    } else {
      setValue("");
      setEpisodeNumber(""); // Synchronize episodeNumber with input field value
    }
  };
  //handling the increment button
  const handleIncrement = () => {
    const newValue = value + 1;
    setValue(newValue);
    setEpisodeNumber(newValue);
    setStartPlayback(true); // Start playback when increment button is clicked
  };
  //handling the decrement button
  const handleDecrement = () => {
    if (value > 1) {
      const newValue = value - 1;
      setValue(newValue);
      setEpisodeNumber(newValue);
      setStartPlayback(true); // Start playback when decrement button is clicked
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setEpisodeNumber(value);
      setStartPlayback(true); // Set startPlayback to true when Enter is pressed
    }
  };

  useEffect(() => {
    showAlert("To begin, input the episode number and press Enter.");
  }, []);

  const showAlert = (message) => {
    setAlert({
      msg: message,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3500);
  };

  return (
    <div className="container">
      <LoadingBar height={4} color="#f11946" progress={progress} />
      {alert && <Alert alert={alert} />}

      <h1 className="display-1 text-center my-2">
        <img
          src="https://raw.githubusercontent.com/Avdhesh-Varshney/Chanakya/main/src/assets/Chanakya-Logo.webp"
          alt="Chanakya-Image"
          style={{ width: "5rem" }}
        />
        चाणक्य नीति
      </h1>

      <div className="row g-3 text-center align-items-center justify-content-center mb-5">
        <div className="col-auto">
          <label htmlFor="inputNumber" className="col-form-label">
            Episode Number
          </label>
        </div>
        <div className="col-auto">
          <div className="input-group">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleDecrement}
            >
              -
            </button>
            <input
              type="number"
              id="inputNumber"
              className="form-control"
              defaultValue={" "}
              value={value}
              onKeyDown={handleKeyPress}
              onChange={handleOnChange}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {startPlayback && (
        <RequestEpisode
          episodeNumber={episodeNumber}
          setProgress={setProgress}
        />
      )}
    </div>
  );
}

export default App;
