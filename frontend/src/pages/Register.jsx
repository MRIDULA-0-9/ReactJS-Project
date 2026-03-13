import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register(){

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();

const registerUser = async () => {

await axios.post(
"http://localhost:5000/api/register",
{
name,
email,
password
}
);

alert("Registration successful");

navigate("/");  // go back to login

};

return(

<div className="auth-container">

<h2>Register</h2>

<input
placeholder="Name"
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={registerUser}>
Register
</button>

<p>
Already have an account? <Link to="/">Login</Link>
</p>

</div>

);

}

export default Register;