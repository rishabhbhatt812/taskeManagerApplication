//import React, { useState } from 'react'
import {CiHeart} from "react-icons/ci";
import {MdDelete} from "react-icons/md";
import {FaEdit} from "react-icons/fa";
import {IoAddCircleSharp} from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
const Cards =({home , setInputDiv, data , setupdateData}) => {

  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  };
   const handleCompleteTask = async(id)=>{
    try {
     await axios.put(`http://localhost:5000/api/v2/complete-task/${id}` ,{},
      {headers}
      );
     
    } catch (error) {
      console.log(error);
    }
   }
   const handleImportant = async(id)=>{
    try {
     await axios.put(`http://localhost:5000/api/v2/update-imp-task/${id}` ,{},
      {headers}
      );
     
    } catch (error) {
      console.log(error);
    }
   }
   
   const deleteTask = async(id)=>{
    try {
     await axios.delete(`http://localhost:5000/api/v2/delete-task/${id}` ,
      {headers}
      );
     
    } catch (error) {
      console.log(error);
    }
   }

    const handleUpdate= (id , title , desc) =>{
      setInputDiv("fixed");
      setupdateData({id:id, title:title , desc :desc}) 
    }
   

   //const [ImportantButton,setImportantButton] = useState("Incomplete");
  return (
    <div className='grid grid-cols-3 gap-4 p-4'>
      {data && data.map((items ,i )=>(
        <div className='bg-gray-800 border rounded p-4 '>
      <div >
        <h3 className='text-x1 font-semibold text-yellow-300'>{items.title}</h3>
        <p className='text-gray-300 text-white my-2'>{items.desc}</p>
        </div>
        <div className='mt-4 w-full flex item-center'> 
          <button className={ `${items.completed===false? "bg-red-500" : "bg-green-800" } p-2  rounded text-gray-200`}
          onClick={()=>handleCompleteTask(items._id)}>
            {items.completed === true ? "Completed" : "Incomplete"}</button>

          <div className='text-white p-2 w-3/6 text-2xl flex justify-around' > 

            <button className='' onClick={()=>handleImportant(items._id)}>{items.important=== false ?( <CiHeart /> ):( <FaHeart className='text-red-500'/>)}</button>

           {home !== false && ( 
            <button onClick={()=>handleUpdate(items._id , items.title , items.desc)}><FaEdit/></button>
          )}

            <button onClick={()=>deleteTask(items._id)} ><MdDelete/></button>
          </div>
          </div>

      </div>))}
      {home === "true"&& (
      <button onClick={()=> setInputDiv("fixed")} className='flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 hover:scale-105 hover:cursor-pointer transition-all duration-300 hover:text-green-600'>
        <IoAddCircleSharp className='text-5xl text-gray-300 '/>
        <h2 className=' text-2xl text-gray-300  '>Add Task</h2>
      </button>)}
    </div>
  )
}

export default Cards ;