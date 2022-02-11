const router = require('express').Router();
const Message = require('../models/Message')


router.post('/', async (req,res) => {

    const newMessage = new Message(req.body);

    try{
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    }catch (err){
        if(err) throw err
    }
})
router.get('/:conversationId', async (req, res) =>{
    try{
        const messages = await Message.find({
            conversationId: req.params.conversationId
        })
        res.status(200).json(messages)
    }catch (err){
        if(err) throw err
    }
})

module.exports = router;