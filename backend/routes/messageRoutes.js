const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

/* SEND MESSAGE */
router.post("/groups/:id/message", async (req, res) => {

try {

const groupId = req.params.id;
const { sender, text, image } = req.body || {};

if (!groupId) {
 return res.status(400).json({ error: "Group ID missing" });
}

const message = new Message({
 groupId: groupId,
 sender: sender || "User",
 text: text || "",
 image: image || ""
});

const savedMessage = await message.save();

res.status(200).json(savedMessage);

} catch (err) {

console.error("MESSAGE SAVE ERROR:", err);

res.status(500).json({
 error: "Failed to save message",
 details: err.message
});

}

});


/* GET MESSAGES */
router.get("/messages/:groupId", async (req, res) => {

try {

const messages = await Message.find({
 groupId: req.params.groupId
}).lean();

res.json(messages);

} catch (err) {

console.error("FETCH MESSAGE ERROR:", err);

res.status(500).json({
 error: "Failed to fetch messages"
});

}

});

module.exports = router;