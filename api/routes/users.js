const router = require('express').Router();
const Users = require('../models/Users');
const bcrypt = require('bcrypt');


// Update user
router.put("/:id", async(req, res) => {
    if ( req.body.userId == req.params.id || req.body.isAdmin ) {
        if ( req.body.password ) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash( req.body.password, salt );
            } catch (error) {
                return res.status(500).json(error);
            }
        }
        try {
            const user = await Users.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated");
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You can update your info only")
    }
});

// Delete user
router.delete("/:id", async(req, res) => {
    if ( req.body.userId == req.params.id || req.body.isAdmin ) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You can't delete other's account")
    }
});

// Get a user
router.get("/", async(req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId 
            ? await Users.findById( userId )
            : await Users.findOne({ username: username });
        const { password, updatedAt, ...other } = user ._doc;
        res.status(200).json(other);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get all users
router.get('/usersList/all', async(req, res)=>{
    try {
        const users = await Users.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get following users
router.get('/usersList/following', async(req, res)=>{
    try {
        const user = Users.findById(req.params.userId);
        const friends = await user;
        res.status(200).json(friends);
    } catch (error) {
        res.status(500).json('error');
    }
});

// Folow a user

router.put("/:id/follow", async (req, res) => {
    if ( req.body.userId !== req.params.id ) {
        try {
            const user = await Users.findById(req.params.id);
            const currentUser = await Users.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json("User has been followed");
            } else {
                res.status(403).json("You allready follow this user");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You can't follow yourself");
    }
});

// Unfollow a user

router.put("/:id/unfollow", async (req, res) => {
    if ( req.body.userId !== req.params.id ) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json("User has been unfollowed");
            } else {
                res.status(403).json("You are not following this user");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You can't follow yourself");
    }
});

module.exports = router;