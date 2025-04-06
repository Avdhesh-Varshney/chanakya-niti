import { formatAudioDataToSend } from '../utils/helpers.js';
import User from '../Models/user.model.js';

export const getAudio = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const episodeNumber = parseInt(id);
        if (isNaN(episodeNumber)) {
            return res.status(400).json({ error: "Invalid episode ID" });
        }

        if (episodeNumber < 1 || episodeNumber > 806) {
            return res.status(400).json({ error: "Episode number must be between 1 and 806" });
        }

        const episodeName = episodeNumber < 10 ? `Ep 0${episodeNumber}` : `Ep ${episodeNumber}`;

        const response = await fetch(process.env.AUDIO_BUCKET_URI, {
            headers: {
                Authorization: `token ${process.env.ACCESS_TOKEN}`,
            },
        });

        const resp = await response.json();

        const audioFiles = resp
            .filter(file => file.name.endsWith(".mp3") || file.name.endsWith(".wav") || file.name.endsWith(".m4a") || file.name.endsWith(".aac"))
            .map(file => file.download_url);

        const URL = audioFiles.find(URL => URL.includes(episodeName));
        let data = formatAudioDataToSend(URL);

        await User.findByIdAndUpdate(userId, { episode: episodeNumber }, { new: true });

        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch episode" });
    }
}