
import express from 'express';
import passport from 'passport';
import Pet from '../models/Pet';
import User from '../models/User';
import { IUser } from '../models/User';
const router = express.Router();


// GET all pets
router.get('/', async (req, res) => {
    try {
      const pets = await Pet.find().lean();
      res.json(pets);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
// Add to favorites
router.post('/:id/favorite', 
    passport.authenticate('jwt', { session: false }),
    async (req: express.Request, res: express.Response) => {
      try {
        const user = req.user as IUser;
        if (!user) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
  
        const updatedUser = await User.findByIdAndUpdate(
          user._id, // Now properly typed
          { $addToSet: { favorites: req.params.id } },
          { new: true }
        ).populate('favorites');
  
        res.json(updatedUser?.favorites);
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
    }
  );
  
  router.post('/:id/adopt', 
    passport.authenticate('jwt', { session: false }),
    async (req: express.Request, res: express.Response) => {
      try {
        const user = req.user as IUser;
        if (!user) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
  
        const pet = await Pet.findById(req.params.id);
        if (!pet) return res.status(404).json({ error: 'Pet not found' });
  
        const updatedUser = await User.findByIdAndUpdate(
          user._id, // Now properly typed
          { $push: { 
            adoptionRequests: {
              pet: pet._id,
              status: 'pending',
              date: new Date()
            }
          }},
          { new: true }
        ).populate('adoptionRequests.pet');
  
        res.status(201).json(updatedUser?.adoptionRequests);
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
    }
  );
  
  
  

  
  
router.get('/:id', async (req, res) => {
    try {
      const pet = await Pet.findById(req.params.id).lean();
      if (!pet) return res.status(404).json({ error: 'Pet not found' });
      res.json(pet);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });

export default router;