const express = require("express");
const router = express.Router();
const Message = require("../models/Message");


/* SEND MESSAGE */
router.post("/groups/:id/message", async (req, res) => {

try{

const message = new Message({
groupId: req.params.id,
sender: req.body.sender || "User",
text: req.body.text || "",
image: req.body.image || ""
});

await message.save();

res.json(message);

}catch(err){

console.log("MESSAGE ERROR:", err);
res.status(500).json({ error: "Failed to send message" });

}

});


/* GET MESSAGES */
router.get("/messages/:groupId", async (req, res) => {

try{

const messages = await Message.find({
groupId: req.params.groupId
});

res.json(messages);

}catch(err){

console.log("FETCH MESSAGE ERROR:", err);
res.status(500).json({ error: "Failed to fetch messages" });

}

});


module.exports = router;