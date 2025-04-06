import express from 'express';
import { authenticateUser } from '../../Middlewares/auth.middleware.js';
import { getAudio } from '../../Controllers/audio.controller.js';

const audioRoutes = express.Router();

audioRoutes.get('/eps/:id', authenticateUser, getAudio);

export default audioRoutes;
