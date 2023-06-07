const router = require('express').Router();
const Post = require('../models/Posts');
const Users = require('../models/Users');

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
router.put('/:id/like', async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if ( !post.likes.includes(req.body.userId) ) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("Post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("Post has been disliked");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get a post
router.get('/:id', async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get timeline posts 

router.get('/timeline/all', async(req, res)=>{
    try {
        const user = await Users.findById(req.body.userId);
        const userPosts = await Post.find({userId: user._id});
        const friendsPosts = await Promise.all(
            user.followings.map((friendsId)=>{
                return Post.find({userId: friendsId});
            })
        )
        res.status(200).json(userPosts.concat(...friendsPosts));
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;