import express from 'express';
import passport from 'passport';
import User from '../models/User';
import { Request, Response } from 'express'; // Add explicit types

const router = express.Router();

// Updated register route with proper typing
router.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body; // Make sure to destructure name
      const existingUser = await User.findOne({ email });
      
      if (existingUser) return res.status(400).json({ error: "Email exists" });
      
      const newUser = new User({ name, email, password });
      await newUser.save();
      res.status(201).json({ user: { id: newUser._id, name, email } });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

// Add types to other routes
router.post('/login', passport.authenticate('local'), (req: Request, res: Response) => {
  res.json({ message: 'Logged in successfully', user: req.user });
});

router.get('/logout', (req: Request, res: Response) => {
  req.logout(() => {
    res.json({ message: 'Logged out successfully' });
  });
});

router.get('/check-auth', (req: Request, res: Response) => {
  res.json({ isAuthenticated: req.isAuthenticated(), user: req.user });
});

export default router;