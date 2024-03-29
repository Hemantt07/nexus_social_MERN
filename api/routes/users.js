const router = require('express').Router();
const Users = require('../models/Users');
const bcrypt = require('bcrypt');

// Find a user by name
router.post("/", async(req, res) => {
    const allUsers = await Users.find()
    const search = req.query.search.toLowerCase().trim();
    if ( search !== '' ) {
        try {
            const filteredUsers = allUsers.filter((user) =>{
                if ( user.firstname.toLowerCase().includes(search) ) {
                    return user.firstname.toLowerCase().includes(search);
                } else if ( user.lastname.toLowerCase().includes(search) ){
                    return user.lastname.toLowerCase().includes(search);
                } else {
                    return user.username.toLowerCase().includes(search);
                }
            });
            res.status(200).json( filteredUsers );
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(200).json([]);
    }
});

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
            }, { new: true });
            const UserData = user.toObject();
            const { password, ...dataNeeded } = UserData;
            res.status(200).json(dataNeeded);
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
router.get('/usersList/all/:userId', async(req, res)=>{
    try { 
        const users = await Users.find({});
        const currentUser = await Users.findById(req.params.userId);
        const allUsers = await Promise.allSettled( users.map( (user) => {
            if (!currentUser.followings.includes(user._id)) {
                return Users.findOne({ '_id': user._id });
            }
        }) );

        let allUsersList = allUsers
            .filter((friend) => friend.status === 'fulfilled')
            .filter((friend) => friend.value )
            .map((friend) => {
                const { _id, username, profilePicture, firstname, lastname } = friend.value;
                return { _id, username, profilePicture, firstname, lastname };
            });
        res.status(200).json(allUsersList);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
});

// Get following users
router.get('/following/:userId', async(req, res)=>{
    try { 
        const user = await Users.findById(req.params.userId);
        const friends = await Promise.allSettled( user.followings.map( (id) => {
            return Users.findOne( {'_id': id} );
        }) );

        let friendsList = friends
        .filter((friend) => friend.status === 'fulfilled')
            .filter((friend) => friend.value)
            .map((friend) => {
                const { _id, username, profilePicture, firstname, lastname } = friend.value;
                return { _id, username, profilePicture, firstname, lastname };
            });

        res.status(200).json(friendsList);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get Follow Requests

router.get('/followers/:userId', async(req, res)=>{
    try { 
        const user = await Users.findById(req.params.userId);
        const followers = await Promise.allSettled( user.followers.map( (id) => {
            if (!user.followings.includes(id)) {
                return Users.findOne({ '_id': id });
            }
        }) );

        let followersList = followers
            .filter((friend) => friend.status === 'fulfilled')
            .filter((friend) => friend.value)
            .map((friend) => {
                const { _id, username, profilePicture, firstname, lastname } = friend.value;
                return { _id, username, profilePicture, firstname, lastname };
            });

        res.status(200).json(followersList);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Follow a user

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
            const user = await Users.findById(req.params.id);
            const currentUser = await Users.findById(req.body.userId);
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