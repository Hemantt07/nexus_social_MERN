const router = require('express').Router();
const Post = require('../models/Posts');

// Create a Post
router.post('/', async(req, res)=>{
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update post
// Delete post
// Like a post

module.exports = router;