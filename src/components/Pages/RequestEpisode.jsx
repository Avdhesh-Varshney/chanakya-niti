import React, { useState, useEffect } from "react";
import Card from "../Cards/Card";

const segregate = (url) => {
  const parts = url.split("/");
  const filename = parts[parts.length - 1];
  let splitFilename;
  if (filename.includes(" - ")) {
    splitFilename = filename.split(" - ");
  } else if (filename.includes("- ")) {
    splitFilename = filename.split("- ");
  } else {
    throw new Error("Unexpected filename format");
  }
  const title = splitFilename[0];
  const content = splitFilename[1].split(".")[0];
  return { title, content, url };
};

const RequestEpisode = (props) => {

  const { episodeNumber, setProgress, setEpisodeNumber } = props;
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [nextContent, setNextContent] = useState("");
  const [nextTitle, setNextTitle] = useState("");


  const fetchData = async (episodeNumber) => {
    // if (episodeNumber < 1) {
    //   showAlert("Enter valid episode");
    //   return;
    // }
    setProgress(5);
    setEpisodeNumber(episodeNumber);
    let episodeName = "";
    let nextEpisodeName = "";
    if (episodeNumber < 10) {
      episodeName = `Ep 0${episodeNumber}`;
      nextEpisodeName = `Ep 0${episodeNumber + 1}`;
    } else {
      episodeName = `Ep ${episodeNumber}`;
      nextEpisodeName = `Ep ${episodeNumber + 1}`;
    }
    setProgress(10);
    try {
      const response = await fetch("https://api.github.com/repos/hack-boi/Chanakya/contents");
      setProgress(30);
      const data = await response.json();
      // console.log(data);
      const audioFiles = data
        .filter(file => file.name.endsWith(".mp3") || file.name.endsWith(".wav") || file.name.endsWith(".m4a") || file.name.endsWith(".aac"))
        .map(file => file.download_url);

      setProgress(55);
      const URL = audioFiles.find(url => url.includes(episodeName));
      const nextURL = audioFiles.find(url => url.includes(nextEpisodeName));
      if (!URL) {
        throw new Error(`${episodeName} not found`);
      }
      setProgress(80);
      let trimData = segregate(URL);
      let nextTrimData = nextURL ? segregate(nextURL) : { title: "No more episodes available,", content: "this is the finale" };

      // Special case for episode 2
      if (episodeNumber === 2) {
        trimData.content = "गुलामी से मुक्ति";
      }

      // Special case for episode 1 up next
      if (episodeNumber === 1 && nextTrimData.title.includes("Ep 02")) {
        nextTrimData.content = "गुलामी से मुक्ति";
      }

      setContent(trimData.content);
      setUrl(trimData.url);
      setNextTitle(nextTrimData.title);
      setNextContent(nextTrimData.content);
    } catch (error) {
      console.error("Error fetching episode:", error);
      setContent("Error fetching episode");
      setNextTitle("Error fetching next episode");
      setNextContent("");
    }
    setProgress(100);
  };

  useEffect(() => {
    fetchData(episodeNumber);
  }, [episodeNumber]);

  return (

    <>
      <div className="episode-container">
        <div className="card-container">
          <Card
            title={`Episode ${episodeNumber}`}
            content={content}
            url={url}
            setEpisodeNumber={setEpisodeNumber}
            episodeNumber={episodeNumber}
            fetchData={fetchData}
            useEffect={useEffect}
          />
        </div>
      </div>
      {/* {nextTitle && nextContent && (
        <button type="button" className="btn btn-secondary position-absolute " style={{ right: 20, bottom: 20 }}
          data-bs-toggle="tooltip" data-bs-placement="top"
          data-bs-custom-class="custom-tooltip"
          data-bs-title={nextContent}>
          Next
        </button>
      )} */}
    </>
  );
};

export default RequestEpisode;
