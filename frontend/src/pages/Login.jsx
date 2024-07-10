import React, { useState } from 'react'
import {useDispatch, useSelector} from "react-redux";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import {authActions} from "../store/auth";

const Login = () => {
  const [Data , setData] = useState({username:"",password:""});

 const history = useNavigate();
 const dispatch = useDispatch();

 const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
 if(isLoggedIn === true){
   history("/");
 }

 const change = (e)=>{
  const {name ,value} = e.target ;
  setData({...Data,[name]:value});
 }

 const submit = async () =>{
  try {
    if(Data.username === "" || Data.password === ""){
      alert("All fields are required");
    }
    else{
    const response =   await axios.post("http://localhost:5000/api/v1/log-in",Data);
    setData({username:"",password:""});
    console.log(response);
    localStorage.setItem("id",response.data.id);
    localStorage.setItem("token",response.data.token);
    dispatch(authActions.login());
    history("/");
    }
  } catch (error) {
    console.log(error);
  }
 }

  return (
    <div className=' bg-gray-800 h-[98vh]  flex items-center justify-center'>
      <div className='p-4 w-2/6 rounded bg-gray-400  '>
      <div className='font-semibold text-2xl'>LogIn</div>
      <input text="username " placeholder='username' className='bg-gray-200 px-3 py-2 my-3 w-full rounded' name='username' value={Data.username}
      onChange={change} required></input>
      
      <input text="password " placeholder='password' className='bg-gray-200 px-3 py-2 my-3 w-full rounded' name='password' value={Data.password} onChange={change}></input>
     <div className='w-full flex items-center justify-between'>
      <button className='bg-blue-400 text-xl font-semibold px-3 py-2 rounded' onClick={submit}>LogIn</button>
     <Link to="/Signup" className='text-gray-600 hover:text-blue-600'> Not having an account? SignUp here</Link>
      </div>
      </div>
    </div>
  )
}

export default Login