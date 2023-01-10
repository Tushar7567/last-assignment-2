import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

// https://last-assignment-2-backend.onrender.com


// http://localhost:5000/api/auth

    const postData = async (e) => {
        e.preventDefault();    
         await axios
          .post("https://last-assignment-2-backend.onrender.com/api/auth", {
            username,
            password,
          },{
            withCredentials: true 
          })
          .then(async () => {
            // console.log(username, password);
           
            console.log("Successfull Login");
            navigate("/adminUsers");
          })
          .catch((err) => {
            window.alert(err.response.data);
            console.log("Invalid Credentials");
            // console.log(err.response.data);
          })
    }


  return (
   <>
    <div className='login'>
      <form action="" onSubmit={postData}>
        <input type="text" className='font-size' placeholder='Username' onChange={(e)=>setUsername(e.target.value)} required/>
        <input type="password" className='font-size' placeholder='Password' onChange={(e)=>setPassword(e.target.value)} required/>
        <button type='submit' className='font-size'> Login</button>
      </form>
    </div>
   </>
  )
}

export default Login
