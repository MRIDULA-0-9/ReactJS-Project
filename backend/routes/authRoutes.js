const express = require("express");
const router = express.Router();
const User = require("../models/User");

/* REGISTER */
router.post("/register", async (req, res) => {

const { name, email, password } = req.body;

try {

const existingUser = await User.findOne({ email });

if (existingUser) {
 return res.status(400).json({ message: "User already exists" });
}

const newUser = new User({
 name,
 email,
 password
});

await newUser.save();

res.json({
 message: "User registered successfully",
 name,
 email
});

} catch (err) {
 res.status(500).json(err);
}

});


/* LOGIN */
router.post("/login", async (req, res) => {

try {

const email = req.body.email.trim();
const password = req.body.password.trim();

const user = await User.findOne({ email });

if (!user) {
 return res.status(401).json({ message: "Email not found" });
}

if (user.password !== password) {
 return res.status(401).json({ message: "Password incorrect" });
}

res.json({
 message: "Login successful",
 name: user.name,
 email: user.email
});

} catch(err){
 res.status(500).json(err);
}

});

module.exports = router;