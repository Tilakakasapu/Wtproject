import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { seedPets } from './pets';

dotenv.config();

const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/pet-adoption';

mongoose.connect(DB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    seedPets().finally(() => mongoose.disconnect());
  })
  .catch(err => console.error('Connection error:', err));