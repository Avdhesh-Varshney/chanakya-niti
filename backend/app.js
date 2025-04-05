import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8000;
const URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Chanakya DataBase Connected!");
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1);
  }
};

connectDB();

app.get('/', (req, res) => {
  res.send('Hello from Chanakya Niti Backend!');
});

app.listen(port, () => {
  console.log(`Chanakya Niti Backend listening on port http://localhost:${port}`);
});
