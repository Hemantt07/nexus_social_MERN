const router = require('express').Router();
const User = require('../models/Users');


router.get("/", (req, res) => {
    res.send("Its a auth root");
});


// Register

router.get("/register",async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password

    })

    try {
        await user.save();
        res.status(200).json();
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;