import express from 'express';
import checkAuth from '../middleware/check_auth.js';
import User from '../models/user.js';

const router = express.Router();

router.get('/', checkAuth, async (req, res) => {
  try {
    console.log(req.userData);
    const user = await User.findById(req.userData.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { favEpisodes, favCharacters, favLocations } = user;
    res.status(200).json({ favEpisodes, favCharacters, favLocations });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;