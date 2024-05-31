import React, { useState, useEffect } from 'react';
import Card from '../Cards/Card';
import './RequestEpisode.css'; // Ensure you import your CSS file if using external CSS

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
  const content = splitFilename[1].split(".")[0];
  return { content, url };
};

const RequestEpisode = (props) => {
  const { episodeNumber, setProgress } = props;
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setProgress(5);
      let episodeName = '';
      if (episodeNumber < 10) {
        episodeName = `Ep 0${episodeNumber}`;
      } else {
        episodeName = `Ep ${episodeNumber}`;
      }
      setProgress(10);
      try {
        const response = await fetch('https://api.github.com/repos/hack-boi/Chanakya/contents');
        setProgress(30);
        const data = await response.json();
        const audioFiles = data
          .filter(file => file.name.endsWith('.mp3') || file.name.endsWith('.wav') || file.name.endsWith('.m4a') || file.name.endsWith('.aac'))
          .map(file => file.download_url);

        setProgress(55);
        const URL = audioFiles.find(url => url.includes(episodeName));
        if (!URL) {
          throw new Error(`${episodeName} not found`);
        }
        setProgress(80);
        let trimData = segregate(URL);
        setContent(trimData.content);
        setUrl(trimData.url);
      } catch (error) {
        console.error('Error fetching episode:', error);
        setContent('Error fetching episode');
      }
      setProgress(100);
    };

    fetchData();
  }, [episodeNumber]);

  const shareEpisode = () => {
    const episodeUrl = `${window.location.origin}/episode/${episodeNumber}`;
    if (navigator.share) {
      navigator.share({
        title: `Episode ${episodeNumber}`,
        text: `Check out Episode ${episodeNumber}: ${content}`,
        url: episodeUrl,
      }).then(() => {
        console.log('Thanks for sharing!');
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(episodeUrl).then(() => {
        alert('Link copied to clipboard!');
      });
    }
  };

  return (
    <div className="request-episode-container">
      <Card title={`Episode ${episodeNumber}`} content={content} url={url} />
      <button className="share-button" onClick={shareEpisode}>Share</button>
    </div>
  );
}

export default RequestEpisode;
