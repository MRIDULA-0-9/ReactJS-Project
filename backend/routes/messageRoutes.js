const express = require("express");
const router = express.Router();
const Message = require("../models/Message");


// SEND MESSAGE
router.post("/groups/:id/message", async(req,res)=>{

const message = new Message({
groupId:req.params.id,
sender:req.body.sender,
text:req.body.text,
image:req.body.image
});

await message.save();

res.json(message);

});


// GET MESSAGES
router.get("/messages/:groupId", async(req,res)=>{

 const messages = await Message.find({
   groupId:req.params.groupId
 });

 res.json(messages);

});

module.exports = router;