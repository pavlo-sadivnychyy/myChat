const ImportantConvList = require('../models/ImportantConv')
const Conversation = require('../models/Conversation');
const router = require('express').Router();

router.post('/', async (req, res) => {

  await ImportantConvList.findOneAndUpdate(
    {userId: req.body.userId},
    { $addToSet: {conversations: req.body.conversationId} },
    function (error, obj) {
      if (error) {
        console.log(error);
      } else {
        res.status(200).json(obj)
      }
    }
).clone().catch(function(err){ console.log(err)})
})


router.get('/:userId', async (req,res) => {
  try{
    const conversation = await ImportantConvList.aggregate([
      { $match: {userId: req.params.userId} },
      {
        $lookup: {
          from: 'conversations',
          localField: "conversations",
          foreignField: "_id",
          as: "conv"
        }
       }])
    res.status(200).json(conversation[0].conv);
  }catch (err){
    console.log(err)
  }
})


module.exports = router;
