import express from 'express';
import User from '../models/user.js';
import checkAuth from '../middleware/check_auth.js';

const router = express.Router();

router.post("/", checkAuth, async (req, res) => {
  try {
    const { id, name, air_date, episode } = req.body;
    const newEpisode = {
        id,
        name,
        air_date,
        episode
    }
    await User.findByIdAndUpdate(req.userData.userId, { $push: { favEpisodes: newEpisode } });
    res.status(201).json({ message: "Episode added to favorites" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.delete("/", checkAuth, async (req, res) => {
    try{
        const { id } = req.body;
        await User.findByIdAndUpdate(req.userData.userId, { $pull: { favEpisodes: { id: id } } });
        res.status(201).json({ message: "Episode removed from favorites" });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
});


export default router