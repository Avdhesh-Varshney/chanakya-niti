import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Toaster, toast } from "react-hot-toast";

import { UserContext } from "../App";
import { storeInSession } from "../common/session";

const Imgs = [
  "/image.webp",
  "/chanakya_and_chandragupta_maurya.jpg",
  "/chanakya-statue.jpg",
  "/Chandragupta_Maurya_Empire.png",
  "/logo.webp",
  "/takshashila.jpg"
];

const Audio = () => {

  const { userAuth, userAuth: { access_token, episode }, setUserAuth } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [URL, setURL] = useState("");

  const fetchEpisode = async () => {
    await axios.get(import.meta.env.VITE_SERVER_DOMAIN + `/api/audio/eps/${episode}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    })
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

    let form = new FormData(audioFormElement);
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    let { episode } = formData;

    episode = parseInt(episode);
    if (isNaN(episode)) return toast.error("Invalid episode number");

    if (!episode) {
      return toast.error("Episode number is required");
    }
    if (episode < 1 || episode > 806) {
      return toast.error("Episode number must be between 1 and 806");
    }

    const updatedUser = { ...userAuth, episode: episode };
    setUserAuth(updatedUser);
    storeInSession("user", JSON.stringify(updatedUser));
  }

  useEffect(() => {
    fetchEpisode();
  }, [episode]);

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto px-4 py-8">
      <Toaster />

      <form id="audioFormElement" onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-center relative">
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
