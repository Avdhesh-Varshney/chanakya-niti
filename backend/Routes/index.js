import express from 'express';
import audioRoutes from './api/audio.routes.js';

const router = express.Router();

router.use('/audio', audioRoutes);

export default router;
