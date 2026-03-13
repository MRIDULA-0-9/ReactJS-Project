const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

/* SEND MESSAGE */
router.post("/groups/:id/message", async (req, res) => {
  try {

    console.log("BODY:", req.body);
    console.log("GROUP ID:", req.params.id);

    const message = new Message({
      groupId: req.params.id,
      sender: req.body.sender || "User",
      text: req.body.text || "",
      image: req.body.image || ""
    });

    const saved = await message.save();

    res.json(saved);

  } catch (err) {
    console.error("MESSAGE ERROR:", err);
    res.status(500).json({ error: err.message });
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