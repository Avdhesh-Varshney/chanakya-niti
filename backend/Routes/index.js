import express from 'express';
import authRoutes from './api/auth.routes.js';
import audioRoutes from './api/audio.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/audio', audioRoutes);

export default router;
