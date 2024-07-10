import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {RxCross2} from "react-icons/rx";
const InputData = ({InputDiv , setInputDiv , updatedData , setupdateData}) => {
  const [Data , setData] = useState({title:"",desc:""});

useEffect(()=>{
  setData({title:updatedData.title , desc:updatedData.desc})
},[updatedData])

  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  };

  const change=(e)=>{
    const {name , value} = e.target;
    setData({...Data,[name]:value})
  }

  const submitData = async () =>{
    if(Data.title === "" || Data.desc === ""){
      alert("All fields are required")
    }else{
     const respo = await axios.post("http://localhost:5000/api/v2/create-task", Data , {headers});

     console.log(respo);
      setData({title: "" , desc:""});
      setInputDiv("hidden");
    }
  }
  
  const UpdateTask =  async () =>{
    if(Data.title === "" || Data.desc === ""){
      alert("All fields are required")
    }else{
     const respo = await axios.put(`http://localhost:5000/api/v2/update-task/${updatedData.id}`, Data , {headers});

     console.log(respo);
     setupdateData({ 
      id:"",
      title:"",
      desc:"",
    });
    setData({title: "" , desc:""});
      setInputDiv("hidden");
    }
  }


  return (
    <>
    <div className={`${InputDiv} top-0 left-0 bg-gray-800   h-screen w-full`}></div>
    <div className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full `}>
      
      <div className='w-2/6 bg-gray-900 p-4 rounded'>
      <div className='flex justify-end '>
        <button 
      onClick={()=>{
        setInputDiv("hidden");  
        setData({
          title:updatedData.title , desc:updatedData.desc
        })
        setupdateData({ 
          id:"",
          title:"",
          desc:"",
        });
       } } className='text-2xl mb-2 text-white '><RxCross2/></button></div>
      <input type='text' placeholder='Title' name="title" className='px-3 py-2 mb-3 rounded w-full bg-gray-270 text-yellow-500 font-semibold ' 
      value={Data.title} onChange={change}></input>
      <textarea className='px-3 py-2 rounded w-full bg-gray-500 my-3 text-white' name='desc' id=' ' cols="30" rows="10" placeholder='Enter the Descriptiom.... ' 
      value={Data.desc} onChange={change}>
      </textarea>
      { updatedData.id ==="" ? (<button className='px-3 py-2 bg-blue-400 rounded text-xl font-semibold' onClick={submitData}>Submit</button> ):
      (<button className='px-3 py-2 bg-blue-400 rounded text-xl font-semibold' onClick={UpdateTask}>Update</button>
      )}
      </div>
      </div>
    </>
  )
}

export default InputData ;