import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login(){

const[email,setEmail] = useState("");
const[password,setPassword] = useState("");

const navigate = useNavigate();

const login = async () => {

try{

const res = await axios.post(
"http://localhost:5000/api/login",
{
email,
password
}
);

localStorage.setItem("user",JSON.stringify(res.data));

navigate("/dashboard");   // redirect after login

}catch(err){
alert("Invalid login");
}

};

return(

<div>

<h2>Login</h2>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
placeholder="Password"
type="password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={login}>
Login
</button>

<p>
Don't have an account? <Link to="/register">Register</Link>
</p>



</div>

)

}

export default Login;