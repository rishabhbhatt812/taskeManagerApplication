import React, { useState , useEffect  } from 'react'
import Cards from '../components/Home/Cards'
import {IoAddCircleSharp} from "react-icons/io5";
import InputData from '../components/Home/InputData';
import axios from 'axios';
export default function Alltask() {

  const[InputDiv ,setInputDiv] = useState("hidden");
  const [Data , setData] = useState();
  const [updatedData , setupdateData] = useState({
    id:"",
    title:"",
    desc:"",
});
  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(()=>{
    const fetch = async ()=>{
  const response =   await axios.get("http://localhost:5000/api/v2/get-all-tasks",
   {headers}
);
 setData(response.data.data);
};
if(localStorage.getItem("id") && localStorage.getItem("token")){
fetch();
}
  });

  return (<>
    <div>
      <div className='w-full flex justify-end px-4 py-2'>
    <button onClick={()=>setInputDiv("fixed")}> <IoAddCircleSharp className='text-4xl text-gray-400  hover:text-green-400 hover:scale-150 transition-all duration-300 '/></button>
      </div>
   { Data &&  (<Cards home={"true"} setInputDiv={setInputDiv} data={Data.tasks}  setupdateData ={setupdateData}/>)}
   </div>
      <InputData InputDiv={InputDiv} setInputDiv={setInputDiv} updatedData={updatedData} setupdateData={setupdateData}/>
      </>
  )
}
