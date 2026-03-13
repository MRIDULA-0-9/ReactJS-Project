const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

/* SEND MESSAGE */
router.post("/groups/:id/message", async (req, res) => {

try {

const { sender, text, image } = req.body;

const message = new Message({
groupId: req.params.id,
sender: sender || "User",
text: text || "",
image: image || ""
});

const savedMessage = await message.save();

res.status(200).json(savedMessage);

} catch (err) {

console.error("Message Save Error:", err);
res.status(500).json({ error: "Message save failed" });

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

console.error("Fetch Message Error:", err);
res.status(500).json({ error: "Fetch failed" });

}

});

module.exports = router;