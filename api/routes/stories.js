const router = require('express').Router();
const Stories = require('../models/Stories');

// Create a Story
router.post('/', async(req, res)=>{
    const newStory = new Stories(req.body);
    try {
        const savedStory = await newStory.save();
        res.status(200).json(savedStory);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete story
router.delete("/story/:id", async(req, res) => {
    if ( req.body.userId == req.params.id || req.body.isAdmin ) {
        try {
            const user = await Stories.findByIdAndDelete(req.params.id);
            res.status(200).json("Story has been deleted");
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You can't delete other's story")
    }
});

// Get a user
router.get("/story/:id", async(req, res) => {
    try {
        const user = await Stories.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get all user
router.get('/stories/all', async(req, res)=>{
    try {
        const users = await Stories.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;