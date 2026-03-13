import App from "../App";

function Dashboard(){

const user = JSON.parse(localStorage.getItem("user"));

if(!user){
return <h2>Please login first</h2>;
}

return(

<div>

<h2>Welcome {user.name}</h2>

<App/>

</div>

);

}

export default Dashboard;