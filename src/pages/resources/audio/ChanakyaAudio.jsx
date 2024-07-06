import React, { useEffect, useState } from "react";
import * as func from "../../../functions/RequestEpisode.module";
import ReactPlayer from "react-player";
import "../../../css/Audio.css"

const ChanakyaAudio = ({ setProgress }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [URL, setURL] = useState(null);
  const [episodeNumber, setEpisodeNumber] = useState(1);
  const [value, setValue] = useState(1);

  const [playbackRate, setPlaybackRate] = useState(1);

  const changePlaybackRate = (rate) => {
    setPlaybackRate(rate);
  };

  useEffect(() => {
    const getData = async () => {
      setProgress(50);
      try {
        const data = await func.fetchData(episodeNumber);
        setProgress(65);
        if (data.trimData) {
          setTitle(data.trimData.title);
          setContent(data.trimData.content);
          setURL(data.trimData.URL);
          setProgress(85);
        } else {
          console.error("No data found!");
          setURL(null);
        }
      } catch (error) {
        console.error("Error fetching episode:", error);
        setURL(null);
      }
      setProgress(100);
    };

    getData();
  }, [episodeNumber, setProgress]);

  const handleClick = () => {
    if (value >= 1 && value <= 806) {
      setEpisodeNumber(value);
    }
  };

  const handleKeyPress = (event) => {
    if (
      event.key === "Enter" &&
      event.target.value >= 1 &&
      event.target.value <= 806
    ) {
      setEpisodeNumber(event.target.value);
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handlePrevious = () => {
    if (episodeNumber > 1) {
      setEpisodeNumber((prevEpisode) => prevEpisode - 1);
    }
  };

  const handleNext = () => {
    if (episodeNumber < 806) {
      setEpisodeNumber((prevEpisode) => prevEpisode + 1);
    }
  };

  return (
    <div className="container centered">
  <div className="input-container">
    <input
      type="number"
      placeholder="Enter episode number"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyPress}
      className="input-field"
      min="1"
      max="806"
    />
    <button type="submit" className="btn btn-dark input-button" onClick={handleClick}>
      Enter
    </button>
  </div>

  <div className="card" style={{ width: "20rem" }}>
    <img
      src="/src/assets/image.webp"
      className="card-img-top"
      alt="chanakya-image"
    />
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{content}</p>

      <ReactPlayer
        url={URL}
        volume={0.5}
        playing
        controls
        playbackRate={playbackRate}
        width="100%"
        height="50px"
      />
    </div>
  </div>
</div>

  );
};

export default ChanakyaAudio;
