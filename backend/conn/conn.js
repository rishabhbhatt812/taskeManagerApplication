const mongoose = require("mongoose");

const conn = async() =>{
  try{
    const reaponse = await mongoose.connect("mongodb://localhost:27017/Task_Managment");
    if(reaponse){
      console.log("Connected to database");
    }
  }catch(error){

    console.log(error);
  }
}

conn();