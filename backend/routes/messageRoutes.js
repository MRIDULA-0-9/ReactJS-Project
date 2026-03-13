const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// SEND MESSAGE
router.post("/groups/:id/message", async (req, res) => {
  try {
    const message = new Message({
      groupId: req.params.id,
      sender: req.body.sender || "User",
      text: req.body.text || "",
      image: req.body.image || ""
    });

    const savedMessage = await message.save();
    res.json(savedMessage);

  } catch (err) {
    console.log("Message Save Error:", err);
    res.status(500).json({ error: "Message save failed" });
  }
});


// GET MESSAGES
router.get("/messages/:groupId", async (req, res) => {
  try {
    const messages = await Message.find({
      groupId: req.params.groupId
    });

    res.json(messages);

  } catch (err) {
    console.log("Fetch Message Error:", err);
    res.status(500).json({ error: "Fetch failed" });
  }
});

module.exports = router;