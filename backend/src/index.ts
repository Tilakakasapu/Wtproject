import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import './config/passport';
import userRoutes from './routes/userRoutes';
import petRoutes from './routes/petRoutes';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
  .connect(process.env.DB_URI!)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

mongoose.connection.on('error', (err) => {
    console.error('💥 MongoDB runtime error:', err);
  });
  
mongoose.connection.on('disconnected', () => {
    console.warn('⚠️  MongoDB disconnected!');
  });

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Update with your Vite port
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      ttl: 24 * 60 * 60, // 1 day
      autoRemove: 'native'
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      sameSite: 'lax'
    }
  }));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
// Add these imports


// Add these routes after auth routes
app.use('/api/user', userRoutes);
app.use('/api/pets', petRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});