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
.then(res => {
setMessages(res.data);
})
.catch(err => console.log(err));


socket.on("receiveMessage", (data) => {

if (data.groupId === groupId) {
setMessages(prev => [...prev, data]);
}

});

return () => {
socket.off("receiveMessage");
};

}, [groupId]);


/* SEND MESSAGE */
const sendMessage = async () => {

if (msg.trim() === "" || !groupId) return;

const user = JSON.parse(localStorage.getItem("user"));

const messageData = {
groupId: groupId,
sender: user?.name || "User",
text: msg
};

try{

// save message to backend
await axios.post(`${API}/api/groups/${groupId}/message`, messageData);

// add message instantly to UI
setMessages(prev => [...prev, messageData]);

// send realtime message
socket.emit("sendMessage", messageData);

// clear input
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

const imageName = res.data.file;

const user = JSON.parse(localStorage.getItem("user"));

const messageData = {
groupId: groupId,
sender: user?.name || "User",
image: imageName
};

// save to backend
await axios.post(`${API}/api/groups/${groupId}/message`, messageData);

// update UI
setMessages(prev => [...prev, messageData]);

// realtime send
socket.emit("sendMessage", messageData);

}catch(err){
console.log(err);
}

};


/* UI */
return (

<div>

<div className="messages">

{messages.map((m, i) => (

<div key={i} className="message">

<b>{m.sender}</b>:

{m.text && <span> {m.text}</span>}

{m.image && (
<img
src={`${API}/uploads/${m.image}`}
alt="file"
style={{ width: "120px", display: "block" }}
/>
)}

</div>

))}

</div>


<div className="chat-input">

<input
value={msg}
onChange={(e) => setMsg(e.target.value)}
placeholder="Type message"
/>

<input type="file" onChange={uploadFile} />

<button className="send-btn" onClick={sendMessage}>
Send
</button>

</div>

</div>

);

}

export default ChatBox;