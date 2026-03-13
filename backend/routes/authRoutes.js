const express = require("express");
const router = express.Router();

let users = [];

// REGISTER
router.post("/register", (req, res) => {

const { name, email, password } = req.body;

users.push({ name, email, password });

res.json({
message: "User registered successfully",
name,
email
});

});

// LOGIN
router.post("/login", (req, res) => {

const { email, password } = req.body;

const user = users.find(
u => u.email === email && u.password === password
);

if (!user) {
return res.status(401).json({ message: "Invalid email or password" });
}

res.json({
message: "Login successful",
name: user.name,
email: user.email
});

});

module.exports = router;