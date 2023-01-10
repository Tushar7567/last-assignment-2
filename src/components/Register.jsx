import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [image, setImage] = useState([]);

    const navigate = useNavigate();

    
  const handleChange = (e) =>{
    console.log(e.target.files[0]);
    // const formData = new FormData(); 
    // formData.append('my-image-file', e.target.files[0], `${e.target.files[0].name}`);
    // console.log(formData);
    setImage(e.target.files[0]);
      
  }

  const postData = async (e) => {
    e.preventDefault(); 
    const formData = new FormData(); 
    formData.append('file', image)
    formData.append('username', username)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('phone', phone)
    formData.append('state', state)
    formData.append('city', city)
    // {
    //   for(var pair of formData.entries()) {
    //     console.log(`${pair[0]}: ${pair[1]}`);
    //   }
    // }


// https://last-assignment-2-backend.onrender.com

// http://localhost:5000/api/auth/register

     await axios
      .post("https://last-assignment-2-backend.onrender.com/api/auth/register",   formData,{
        // username,
        // email,
        // password,
        // phone,
        // state,
        // city,
        // image
      
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(async () => {
        // console.log(email, password);
        console.log("Successfull Login");
        navigate("/");
      })
      .catch((err) => {
        // window.alert("Invalid Credentials");
        console.log("Invalid Credentials");
        console.log(err);
      })
}

  return (
   <>
    <div className='register'>
      <form action="" onSubmit={postData} >
      <input type="text" className='font-size' placeholder='Username' onChange={(e)=>setUsername(e.target.value)} required/>
      <input type="email" className='font-size' placeholder='Email' onChange={(e)=>setEmail(e.target.value)} required/>
      <input type="password" className='font-size' placeholder='Password' onChange={(e)=>setPassword(e.target.value)} required/>
      <input type="tel" className='font-size' placeholder='Phone no.' onChange={(e)=>setPhone(e.target.value)} required/>
        <select name="State" className='font-size' id="State" onChange={(e)=>setState(e.target.value)}>
            {/* <option value="">State</option> */}\
            <option value="odisha">Odisha</option>
            <option value="bihar">Bihar</option>
            <option value="west bengal">West Bengal</option>
        </select>
        <select name="City" className='font-size' id="City" onChange={(e)=>setCity(e.target.value)}>
            {/* <option value="">State</option> */}\
            <option value="cuttack">Cuttack</option>
            <option value="bbsr">BBSR</option>
            <option value="jajpur">Jajpur</option>
        </select>
        <input type="file" name='file' onChange={handleChange} />
        {/* <img src={image} style={image ?{ width: "100px", height: "100px"}:{}} /> */}
        {/* <button onClick={upload}>Upload</button> */}

        <button type='submit' className='font-size'> Register</button>
      </form>
    </div>
   </>
  )
}

export default Register
