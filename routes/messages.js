const router = require('express').Router();
const Message = require('../models/Message')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads/')
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: storage,
});


router.post('/', upload.single('file'), async (req,res) => {

    const newMessage = new Message({
        conversationId: req.body.conversationId,
        sender: req.body.sender,
        text: req.body.text,
        type: req.body.type,
        file: req.file?.path
    });

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
