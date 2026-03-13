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

/* CORS */
app.use(cors({
  origin: "https://react-js-project-gkca.vercel.app",
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));

/* BODY PARSERS */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ROUTES */
app.use("/api", authRoutes);
app.use("/api", groupRoutes);
app.use("/api", messageRoutes);
app.use("/api", uploadRoutes);

/* STATIC FILES */
app.use("/uploads", express.static("uploads"));

/* DATABASE */
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>{
  console.error("MongoDB Connection Error:",err);
});

/* SOCKET SERVER */
const server = http.createServer(app);

const io = new Server(server,{
  cors:{
    origin:"https://react-js-project-gkca.vercel.app",
    methods:["GET","POST"]
  }
});

io.on("connection",(socket)=>{

 console.log("User connected:",socket.id);

 socket.on("sendMessage",(data)=>{
   io.emit("receiveMessage",data);
 });

 socket.on("disconnect",()=>{
   console.log("User disconnected");
 });

});

/* SERVER */
const PORT = process.env.PORT || 5000;

server.listen(PORT,()=>{
 console.log("Server running on port",PORT);
});