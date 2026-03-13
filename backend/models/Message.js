const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  groupId:String,
  sender:String,
  text:String,
  image:String,
  createdAt:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model("Message",messageSchema);