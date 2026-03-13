const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const authRoutes = require("./routes/authRoutes");
const groupRoutes = require("./routes/groupRoutes");
const messageRoutes = require("./routes/messageRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

app.use(cors());
app.use(express.json());

/* ROUTES */
app.use("/api", authRoutes);
app.use("/api", groupRoutes);
app.use("/api", messageRoutes);
app.use("/api", uploadRoutes);

/* STATIC FILES */
app.use("/uploads", express.static("uploads"));

/* DATABASE */
mongoose.connect("mongodb://127.0.0.1:27017/groupchat")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

/* SOCKET SERVER */
const server = http.createServer(app);

const io = new Server(server,{
 cors:{origin:"*"}
});

io.on("connection",(socket)=>{

 console.log("User connected");

 socket.on("sendMessage",(data)=>{
   io.emit("receiveMessage",data);
 });

});

/* SERVER START */
server.listen(5000,()=>{
 console.log("Server running on port 5000");
});