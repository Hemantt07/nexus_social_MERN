const router = require('express').Router();
const Conversations = require('../models/Conversations');

// Create a conversation
router.post('/', async(req, res)=>{
    try {
        if ( req.body.senderId !== '' && req.body.receiverId !== '' ) {
            const conversation = new Conversations({
                members : [
                    req.body.senderId,
                    req.body.receiverId
                ]
            })
            await conversation.save();
            res.status(201).json(conversation)
        } else {
            res.status(400).json('Something is wrong')
        }
    } catch (error) {
        res.status(500).json(error)
    }
});

// Delete conversation
router.delete("/conversation/:id", async(req, res) => {
    try {
        const conversation = await Conversations.findByIdAndDelete(req.params.id)
        res.status(200).json('Conversations has been deleted')
    } catch (error) {
        res.status(500).json({error:'Internal server error'})
    }
});

// Get all conversation
router.get('/:userId', async(req, res)=>{
    try {
        const conversation = await Conversations.find({
            members : {
                $in:[req.params.userId]
            }
        })
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;