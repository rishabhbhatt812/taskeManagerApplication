import React, { useEffect, useState } from 'react'
import Cards from '../components/Home/Cards'
import axios from 'axios';

export default function CompleteTask(){

const [ Data , setData] =  useState();
const headers = {
  id:localStorage.getItem("id"),
  authorization:`Bearer ${localStorage.getItem("token")}`,
};
useEffect(()=>{
  const fetch = async ()=>{
const response =   await axios.get("http://localhost:5000/api/v2/get-completed-tasks",
 {headers}
);
setData(response.data.data);
};
fetch();
})

  return (
    <div><Cards home={"false"} data = {Data}/>
    </div>
  )
}
