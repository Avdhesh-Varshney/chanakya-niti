import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './Routes/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));

// Routes
app.get('/', (req, res) => res.send('Hello from Chanakya Niti Backend!'));
app.use('/api', router);

app.listen(port, () =>
  console.log(
    `Chanakya Niti Backend listening on port http://localhost:${port}`,
  ),
);
