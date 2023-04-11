import express from 'express';
import User from '../models/user.js';
import checkAuth from '../middleware/check_auth.js';

const router = express.Router();

router.post('/', checkAuth, async (req, res) => {
    try {
        const { id, name, image, status, species, gender } = req.body;
        const newCharacter = {
            id,
            name,
            image,
            status,
            species,
            gender
        };
        await User.findByIdAndUpdate(req.userData.userId, { $push: { favCharacters: newCharacter } });
        res.status(201).json({ message: 'Character added to favorites' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/', checkAuth, async (req, res) => {
    try {
        const { id } = req.body;
        await User.updateOne({id: req.userData.userId}, { '$pull': { favCharacters: { id: id } }});
        res.status(200).json({ message: 'Character removed from favorites' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


export default router;
