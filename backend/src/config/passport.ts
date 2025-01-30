import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User, { IUser } from '../models/User';
import mongoose from 'mongoose';
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email }).select('+password') as IUser;
      
      if (!user) return done(null, false, { message: 'Invalid credentials' });
      
      const isMatch = await user.comparePassword(password);
      return isMatch ? done(null, user) : done(null, false, { message: 'Invalid credentials' });
    } catch (err) {
      return done(err);
    }
  }));
passport.serializeUser((user: any, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
declare global {
    namespace Express {
      interface User {
        _id: mongoose.Types.ObjectId;
        email: string;
      }
    }
  }