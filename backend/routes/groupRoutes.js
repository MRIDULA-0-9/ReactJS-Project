const express = require("express");
const router = express.Router();
const Group = require("../models/Group");


// CREATE GROUP
router.post("/groups", async(req,res)=>{

 const group = new Group({
   name:req.body.name,
   admin:req.body.admin,
   members:[req.body.admin]
 });

 await group.save();
 res.json(group);

});


// GET GROUPS
router.get("/groups", async(req,res)=>{

 const groups = await Group.find();
 res.json(groups);

});


// ADD MEMBER
router.put("/groups/:id/add-member", async(req,res)=>{

const group = await Group.findById(req.params.id);

if(group.admin !== req.body.user){
 return res.status(403).json("Only admin can add members");
}

group.members.push(req.body.member);

await group.save();

res.json(group);

});


// REMOVE MEMBER
router.put("/groups/:id/remove-member", async(req,res)=>{

const group = await Group.findById(req.params.id);

if(group.admin !== req.body.user){
 return res.status(403).json("Only admin can remove members");
}

group.members = group.members.filter(
m => m !== req.body.member
);

await group.save();

res.json(group);

});


router.post("/groups/:id/message", async (req,res)=>{

const {groupId,sender,text} = req.body;

const message = new Message({
groupId,
sender,
text
});

await message.save();

res.json(message);

});
module.exports = router;