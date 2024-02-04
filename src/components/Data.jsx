import React, { useState, useEffect } from 'react';

const Data = () => {
  const [audioFiles, setAudioFiles] = useState([]);

  useEffect(() => {
    const fetchAudioFiles = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/hack-boi/Chanakya/contents');
        const data = await response.json();
        const audioFiles = data
          .filter(file => file.name.endsWith('.mp3') || file.name.endsWith('.wav') || file.name.endsWith('.m4a') || file.name.endsWith('.aac'))
          .map(file => file.download_url);
        setAudioFiles(audioFiles);
      } catch (error) {
        console.error('Error fetching audio files:', error);
      }
    };

    fetchAudioFiles();
  }, []);

  const segregate = (audioFiles) => {
    return audioFiles.map((url) => {
      const parts = url.split("/");
      const filename = parts[parts.length - 1];
      const splitFilename = filename.split(" - ");
      const episodeNumber = splitFilename[0].split(" ")[1];
      const content = splitFilename[1].split(".")[0];
      return { episodeNumber, content, url };
    });
  }

  const data = segregate(audioFiles);

  return data;
}

export default Data;
