import axios from "axios";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Toaster, toast } from "react-hot-toast";

const Imgs = [
  "/image.webp",
  "/chanakya_and_chandragupta_maurya.jpg",
  "/chanakya-statue.jpg",
  "/Chandragupta_Maurya_Empire.png",
  "/logo.webp",
  "/takshashila.jpg"
];

const Audio = () => {

  const [episode, setEpisode] = useState(() => {
    const stored = localStorage.getItem("episode");
    return stored ? parseInt(stored) : null;
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [URL, setURL] = useState("");

  const fetchEpisode = async (episodeNumber) => {
    await axios.get(import.meta.env.VITE_SERVER_DOMAIN + `/api/audio/eps/${episodeNumber}`)
      .then(({ data }) => {
        setTitle(data.title);
        setContent(data.content);
        setURL(`${import.meta.env.VITE_AUDIO_BUCKET_URI}/${data.filename}`);
        toast.success("Enjoy your episode!");
      })
      .catch(({ response }) => {
        toast.error(response.data.error);
        console.error(response.data.error);
      });
  }

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * Imgs.length);
    return Imgs[randomIndex];
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let form = new FormData(e.target);
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    let { episode: episodeInput } = formData;

    const episodeNumber = parseInt(episodeInput);
    if (isNaN(episodeNumber)) return toast.error("Invalid episode number");

    if (episodeNumber < 1 || episodeNumber > 806) {
      return toast.error("Episode number must be between 1 and 806");
    }

    localStorage.setItem("episode", episodeNumber);
    setEpisode(episodeNumber);
  }

  useEffect(() => {
    if (episode) fetchEpisode(episode);
  }, [episode]);

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto px-4 py-8">
      <Toaster />

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-center relative">
        <input
          name="episode"
          type="number"
          placeholder="Enter episode number"
          className="input-box"
        />

        <i className="fi fi-rr-music input-icon"></i>

        <button
          type="submit"
          className="input-icon left-[auto] right-4 bg-[#fdf8e4] text-black rounded-lg py-2 px-4 capitalize border border-[#bfae64] hover:bg-[#f4eacb] transition duration-300"
        >
          Enter
        </button>
      </form>

      {URL && (
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-xl shadow-lg w-full max-h-[500px] aspect-video">
            <img
              src={getRandomImage()}
              alt=""
              className="w-full h-full object-cover object-top transition duration-300 hover:scale-105"
            />
          </div>

          <p className="text-center text-xl font-semibold text-gray-800">
            {title} - <span className="text-md text-gray-600">{content}</span>
          </p>

          <ReactPlayer
            url={URL}
            volume={0.75}
            playing
            controls
            height="50px"
            width="100%"
          />
        </div>
      )}
    </div>
  );
};

export default Audio;
