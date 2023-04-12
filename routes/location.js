import express from 'express';
import User from '../models/user.js';
import checkAuth from '../middleware/check_auth.js';

const router = express.Router();

router.post("/", checkAuth, async (req, res) => {
  try {
    const { id, name, type, dimension } = req.body;
    const newLocation = {
        id,
        name,
        type,
        dimension
    }
    await User.findByIdAndUpdate(req.userData.userId, { $push: { favLocations: newLocation } });
    res.status(201).json({ message: "Location added to favorites" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.delete("/", checkAuth, async (req, res) => {
    try{
        const { id } = req.body;
        await User.findByIdAndUpdate(req.userData.userId, { $pull: { favLocations: { id: id } } });
        res.status(201).json({ message: "Location removed from favorites" });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
});


export default router