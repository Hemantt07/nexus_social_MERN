const router = require('express').Router();

router.get("/", (req, res) => {
    res.send("Its a user root");
});

module.exports = router;