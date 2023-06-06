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
router.put('/:id', async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({$set:req.body});
            res.status(200).json("Post has been updated");
        } else {
            res.status(403).json("You can update your post only");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete post
router.delete('/:id', async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("Post has been delete");
        } else {
            res.status(403).json("You can delete your post only");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});
// Like a post

module.exports = router;