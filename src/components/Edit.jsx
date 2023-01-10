import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [image, setImage] = useState([]);

    const [result, setResult] = useState([])

    const navigate = useNavigate();
    let {user} = useParams();

    
  const handleChange = (e) =>{
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
      
  }

  const fetchData = async () => {
    // e.preventDefault();
    await axios
      .get( `https://last-assignment-2-backend.onrender.com/api/users/edit/:${user}`, {
        withCredentials: true,
      })
      .then(async (res) => {
        // console.log(res.data);
       setResult(res.data)
       console.log(res.data);


        // setData(res.data);

        console.log("fetched data");
      })
      .catch((err) => {
        // window.alert("Invalid Credentials");
        console.log("Invalid Credentials");
        navigate("/");
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);





  const postData = async (e) => {
    e.preventDefault(); 
    const formData = new FormData(); 
    // formData.append('file', image)
    formData.append('username', result[0].username)
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
      .put(`https://last-assignment-2-backend.onrender.com/api/users/edit/:${user}`,   formData,{
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
        console.log("Data Edited");
        navigate("/adminUsers");
      })
      .catch((err) => {
        // window.alert("Invalid Credentials");
        console.log("could not edit data");
        console.log(err);
      })
}

  return (
   <>
   {result.map((item,index)=>{
    return(
        <div key={index+1} className='register'>
        <form action="" onSubmit={postData} >
        <input type="text" className='font-size'  defaultValue={item.username} disabled onChange={(e)=>setUsername(e.target.value)} placeholder='Username'/>
        <input type="email" className='font-size' placeholder='Email' defaultValue={item.email} onChange={(e)=>setEmail(e.target.value)} required/>
        <input type="tel" className='font-size' placeholder='Phone no.' defaultValue={item.phone} onChange={(e)=>setPhone(e.target.value)} required/>
          <select name="State" className='font-size' id="State" defaultValue={item.state} onChange={(e)=>setState(e.target.value)}>
              {/* <option value="">State</option> */}\
              <option value="odisha">Odisha</option>
              <option value="bihar">Bihar</option>
              <option value="west bengal">West Bengal</option>
          </select>
          <select name="City" className='font-size' id="City" defaultValue={item.city} onChange={(e)=>setCity(e.target.value)}>
              {/* <option value="">State</option> */}\
              <option value="cuttack">Cuttack</option>
              <option value="bbsr">BBSR</option>
              <option value="jajpur">Jajpur</option>
          </select>
          <input type="file" name='file' disabled onChange={handleChange} />
          {/* <img src={image} style={image ?{ width: "100px", height: "100px"}:{}} /> */}
          {/* <button onClick={upload}>Upload</button> */}
  
          <button type='submit' className='font-size'> Edit</button>
        </form>
      </div>
    )
   })}
   </>
  )
}

export default Edit
