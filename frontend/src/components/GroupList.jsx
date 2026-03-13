import { useState, useEffect } from "react";
import axios from "axios";

function GroupList({setSelectedGroup,setGroupName,setMembers}) {

const [groups,setGroups] = useState([]);
const [newGroup,setNewGroup] = useState("");
const [member,setMember] = useState("");

useEffect(()=>{

axios.get("http://localhost:5000/api/groups")
.then(res => setGroups(res.data));

},[]);


const createGroup = async ()=>{

const res = await axios.post(
"http://localhost:5000/api/groups",
{name:newGroup,admin:"User"}
);

setGroups([...groups,res.data]);
setNewGroup("");

};


const addMember = async (id)=>{

await axios.put(
`http://localhost:5000/api/groups/${id}/add-member`,
{member,user:"User"}
);

alert("Member Added");

};


const removeMember = async (groupId,memberName)=>{

await axios.put(
`http://localhost:5000/api/groups/${groupId}/remove-member`,
{
member:memberName,
user:"User"
}
);

alert("Member removed");

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