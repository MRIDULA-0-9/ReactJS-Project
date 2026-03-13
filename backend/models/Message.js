const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({

groupId: String,
sender: String,
text: { type: String, default: "" },
image: { type: String, default: "" }

});

module.exports = mongoose.model("Message", messageSchema);