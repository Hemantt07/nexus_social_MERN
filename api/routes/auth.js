const router = require('express').Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');

// Register
router.post("/register",async (req, res) => {
    try {
        // Genrate new password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash( req.body.password, salt )

        // Generate new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        })

        // Save new user
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/login",async (req, res)=>{
    try {
        const user = await User.findOne({email:req.body.email});
        !user && res.status(404).json("User not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("Wrong Password")

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;