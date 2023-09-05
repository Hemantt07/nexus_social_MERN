const router = require('express').Router();
const Messages = require('../models/Messages');

// Create a message
router.post('/', async(req, res)=>{
    const content = await req.body.messageContent;
    const conversationId = await req.body.conversationId;
    const senderId = await req.body.senderId;
    try {
        const message = new Messages({
            content : content,
            conversationId : conversationId,
            senderId : senderId
        })
        await message.save()
        res.status(201).json(message)
    } catch (error) {
        res.status(500).json({error: 'Internal server error'})
    }
});

// Delete message
router.delete("/message/:id", async(req, res) => {
    try {
        const message = await Messages.findByIdAndDelete(req.params.id)
        res.status(200).json('Messages has been deleted')
    } catch (error) {
        res.status(500).json({error:'Internal server error'})
    }
});

// Get all message
router.get('/:conversationsId', async(req, res)=>{
    try {
        const message = await Messages.find({
            conversationId : req.params.conversationsId
        })
        res.status(200).json(message)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;