const router = require('express').Router();
const User = require('../models/Users');
const bcryptjs = require('bcryptjs');

// Register route
router.post("/register",async (req, res) => {
    try {
        // Genrate new password
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash( req.body.password, salt )

        // Generate new user
        const newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        })

        // // Save new user
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//  Login route
router.post("/login",async (req, res)=>{
    try {
        const user = await User.findOne({ email:req.body.email });
        !user && res.status(404).json("User not found");

        const validPassword = await bcryptjs.compare(req.body.password, user.password)

        if (validPassword) {
            res.status(200).json(user)
        } else {
            res.status(401).json("Wrong Password")
        }       

    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;