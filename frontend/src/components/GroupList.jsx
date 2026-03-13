import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

function GroupList({ setSelectedGroup, setGroupName, setMembers }) {

const [groups, setGroups] = useState([]);
const [newGroup, setNewGroup] = useState("");
const [member, setMember] = useState("");

/* LOAD GROUPS */
useEffect(() => {

axios.get(`${API}/api/groups`)
.then(res => setGroups(res.data))
.catch(err => console.log(err));

}, []);


/* CREATE GROUP */
const createGroup = async () => {

try{

const res = await axios.post(`${API}/api/groups`,{
 name: newGroup,
 admin: "User"
});

setGroups([...groups, res.data]);
setNewGroup("");

}catch(err){
console.log(err);
}

};


/* ADD MEMBER */
const addMember = async (id) => {

try{

await axios.put(`${API}/api/groups/${id}/add-member`,{
 member,
 user:"User"
});

alert("Member Added");

}catch(err){
console.log(err);
}

};


/* REMOVE MEMBER */
const removeMember = async (groupId, memberName) => {

try{

await axios.put(`${API}/api/groups/${groupId}/remove-member`,{
 member: memberName,
 user:"User"
});

alert("Member removed");

}catch(err){
console.log(err);
}

};


return(

<div>

{groups.map((g) => (

<div key={g._id} className="group-card">

{/* GROUP NAME */}
<p
className="group-item"
onClick={()=>{
setSelectedGroup(g._id);
setGroupName(g.name);
setMembers(g.members || []);
}}
>
{g.name}
</p>


{/* ADD MEMBER */}
<div className="member-controls">

<input
placeholder="Member name"
value={member}
onChange={(e)=>setMember(e.target.value)}
/>

<button onClick={()=>addMember(g._id)}>
Add Member
</button>

</div>


{/* MEMBER LIST */}
<div className="member-list">

{g.members && g.members.map((m,i)=>(

<div key={i} className="member-row">

<span>{m}</span>

<button
className="remove-btn"
onClick={()=>removeMember(g._id,m)}
>
Remove
</button>

</div>

))}

</div>

</div>

))}


<input
value={newGroup}
onChange={(e)=>setNewGroup(e.target.value)}
placeholder="New group"
/>

<button onClick={createGroup}>
Create Group
</button>

</div>

);

}

export default GroupList;