import express from 'express';
import passport from 'passport';
import User from '../models/User';
// import { Request, Response } from 'express'; // Add explicit types
import { Request, Response, NextFunction } from 'express';

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


  router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err: Error | null, user: Express.User | false, info: { message?: string } | undefined) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: info?.message || 'Unauthorized' });
  
      req.logIn(user, (err: Error | null) => {
        if (err) return next(err);
        res.json({ message: 'Logged in successfully', user });
      });
    })(req, res, next);
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