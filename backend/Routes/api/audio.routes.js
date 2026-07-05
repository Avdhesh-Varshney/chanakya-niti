import express from 'express';
import rateLimit from 'express-rate-limit';
import { getEpisodes } from '../../Controllers/audio.controller.js';

const audioRoutes = express.Router();

const audioLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 30,
    standardHeaders: true,
    legacyHeaders: false,
});

audioRoutes.get('/eps', audioLimiter, getEpisodes);

export default audioRoutes;
