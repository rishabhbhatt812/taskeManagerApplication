//rafce
import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { useSelector } from 'react-redux';
const Signup = () => {
  const history = useNavigate();
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  if(isLoggedIn === true){
    history("/");
  }
 const [Data , setData] = useState({username:"",email:"",password:""});

 const change = (e)=>{
  const {name ,value} = e.target ;
  setData({...Data,[name]:value});
 }

 const submit = async () =>{
  try {
    if(Data.username === "" || Data.email === "" || Data.password === ""){
      alert("All fields are required");
    }
    else{
    const response =   await axios.post("http://localhost:5000/api/v1/sign-in",Data);
    setData({username:"",email:"",password:""});
    alert(response.data.message);
    history("/Login");

    }
  } catch (error) {
    console.log(error.response.data.message);
  }
 }

  return (
    <div className=' bg-gray-800 h-[98vh]  flex items-center justify-center'>
      <div className='p-4 w-2/6 rounded bg-gray-400  '>
      <div className='font-semibold text-2xl'>Signup</div>
      <input 
      type="username "
       placeholder='username'
        className='bg-gray-200 px-3 py-2 my-3 w-full rounded' name='username'
        value={Data.username}
        onChange={change}
         required>

         </input>
         <input 
      type="email" 
      placeholder='email' 
      className='bg-gray-200 px-3 py-2 my-3 w-full rounded' name='email'
      value={Data.email}
      onChange ={change}
      required>
     
      </input>
      <input type="password " 
      placeholder='password' 
      className='bg-gray-200 px-3 py-2 my-3 w-full rounded' name='password'
      value={Data.password}
       onChange ={change} >

      </input>
      <div className='w-full flex items-center justify-between'>
      <button className='bg-blue-400 text-xl font-semibold px-3 py-2 rounded' onClick={submit}>SignUp</button>
     <Link to="/Login" className='text-gray-600 hover:text-blue-600'> Already having an account? Login here</Link>
      </div>
      </div>
    </div>
  )
}

export default Signup