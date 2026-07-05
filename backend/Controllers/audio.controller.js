import { parseEpisodeFile } from '../utils/helpers.js';

const CACHE_TTL_MS = 10 * 60 * 1000;
let cachedFiles = null;
let cachedAt = 0;

const getAudioFiles = async () => {
    if (cachedFiles && Date.now() - cachedAt < CACHE_TTL_MS) {
        return cachedFiles;
    }

    const response = await fetch(process.env.AUDIO_BUCKET_URI, {
        headers: {
            Authorization: `token ${process.env.ACCESS_TOKEN}`,
        },
    });

    const resp = await response.json();

    cachedFiles = resp
        .filter(file => file.name.endsWith(".mp3") || file.name.endsWith(".wav") || file.name.endsWith(".m4a") || file.name.endsWith(".aac"))
        .map(file => file.download_url);
    cachedAt = Date.now();

    return cachedFiles;
};

export const getEpisodes = async (req, res) => {
    try {
        const audioFiles = await getAudioFiles();

        const episodes = audioFiles
            .map(parseEpisodeFile)
            .filter(episode => !isNaN(episode.id) && episode.title)
            .sort((a, b) => a.id - b.id);

        return res.status(200).json(episodes);

    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch episodes" });
    }
}
