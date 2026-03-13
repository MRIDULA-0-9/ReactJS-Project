import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const API = import.meta.env.VITE_API_URL;
const socket = io(API);

function ChatBox({ groupId }) {

const [msg, setMsg] = useState("");
const [messages, setMessages] = useState([]);


/* LOAD MESSAGES */
useEffect(() => {

if (!groupId) return;

axios.get(`${API}/api/messages/${groupId}`)
.then(res => setMessages(res.data))
.catch(err => console.log(err));

socket.off("receiveMessage");

socket.on("receiveMessage", (data) => {
if (data.groupId === groupId) {
setMessages(prev => [...prev, data]);
}
});

}, [groupId]);


/* SEND MESSAGE */
const sendMessage = async () => {

if (msg.trim() === "") return;

const user = JSON.parse(localStorage.getItem("user"));

const messageData = {
groupId,
sender: user?.name || "User",
text: msg
};

try{

const res = await axios.post(
`${API}/api/groups/${groupId}/message`,
messageData
);

setMessages(prev => [...prev, res.data]);

socket.emit("sendMessage", res.data);

setMsg("");

}catch(err){
console.log(err);
}

};


/* UPLOAD FILE */
const uploadFile = async (e) => {

const file = e.target.files[0];
if (!file) return;

const formData = new FormData();
formData.append("file", file);

try{

const res = await axios.post(`${API}/api/upload`, formData);

const user = JSON.parse(localStorage.getItem("user"));

const messageData = {
groupId,
sender: user?.name || "User",
image: res.data.file
};

const saved = await axios.post(
`${API}/api/groups/${groupId}/message`,
messageData
);

setMessages(prev => [...prev, saved.data]);

socket.emit("sendMessage", saved.data);

}catch(err){
console.log(err);
}

};


return (

<div>

<div className="messages">

{messages.map((m,i)=>(

<div key={i} className="message">

<b>{m.sender}</b>

{m.text && <span>: {m.text}</span>}

{m.image && (
<img
src={`${API}/uploads/${m.image}`}
style={{width:"120px"}}
/>
)}

</div>

))}

</div>


<div className="chat-input">

<input
value={msg}
onChange={(e)=>setMsg(e.target.value)}
placeholder="Type message"
/>

<input type="file" onChange={uploadFile} />

<button onClick={sendMessage}>
Send
</button>

</div>

</div>

);

}

export default ChatBox;