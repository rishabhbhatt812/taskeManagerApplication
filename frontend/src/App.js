import React, { useEffect } from "react";
import './App.css';
import {useDispatch} from "react-redux";
import Home from "./pages/Home.jsx";
import {  Routes ,Route, useNavigate } from "react-router-dom";
import Alltask from "./pages/Alltask.jsx";
import ImportantTask from "./pages/ImportantTask.jsx"
import CompleteTask from "./pages/CompleteTask.jsx";
import IncompleteTask from "./pages/IncompleteTask.jsx";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import { authActions } from "./store/auth.js";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  useEffect(()=>{
    if(localStorage.getItem("id") && localStorage.getItem("token")){
       dispatch(authActions.login());
    }else if(isLoggedIn === false){
      navigate("/Signup");
    }
  },[]);
  
  return (
    <div className=" text-black h-screen p-2  relative" >
      
      <Routes>
        <Route exact path="/" element={<Home/>}>
        <Route  index element={<Alltask/>}/>

        <Route path="/importanttasks" element={<ImportantTask/>}/>
        
        <Route path="/completedtasks" element={<CompleteTask/>}/>
        
        <Route path="/incompletedtasks" element={<IncompleteTask/>}/>
        </Route>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/Login" element={<Login/>}/>
      </Routes>
   
    </div>
  );
}

export default App;
