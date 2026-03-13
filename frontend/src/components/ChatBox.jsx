import {useState,useEffect} from "react";
import axios from "axios";
import {io} from "socket.io-client";

const socket = io("http://localhost:5000");

function ChatBox({groupId}){

const [msg,setMsg] = useState("");
const [messages,setMessages] = useState([]);

useEffect(()=>{

if(!groupId) return;

axios.get(`http://localhost:5000/api/messages/${groupId}`)
.then(res=>{
setMessages(res.data);
});

socket.on("receiveMessage",(data)=>{

if(data.groupId === groupId){
setMessages(prev => [...prev,data]);
}

});

},[groupId]);


const sendMessage = async () => {

if(msg.trim() === "" || !groupId) return;

const user = JSON.parse(localStorage.getItem("user"));

const messageData = {
groupId: groupId,
sender: user?.name || "User",
text: msg
};

try{

// save message to backend
await axios.post(
`http://localhost:5000/api/groups/${groupId}/message`,
messageData
);

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

const uploadFile = async (e)=>{

 const file = e.target.files[0];

 const formData = new FormData();

 formData.append("file",file);

 const res = await axios.post(
   "http://localhost:5000/api/upload",
   formData
 );

 const imageName = res.data.file;

 const messageData = {
   sender: members[0],
   image:imageName
 };

 await axios.post(
   `http://localhost:5000/api/groups/${groupId}/message`,
   messageData
 );

 socket.emit("sendMessage",{...messageData,groupId});

};


return(

<div>

<div className="messages">

{messages.map((m,i)=>(
<div key={i} className="message">

<b>{m.sender}</b>: {m.text}

</div>
))}

</div>


<div className="chat-input">

<input
value={msg}
onChange={(e)=>setMsg(e.target.value)}
placeholder="Type message"
/>

<input type="file" onChange={uploadFile}/>

<button className="send-btn" onClick={sendMessage}>
Send
</button>

</div>

</div>

)
}

export default ChatBox;