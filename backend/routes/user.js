const { request } = require("express");
const User = require("../models/user");
const router = require("express").Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
//SIGN IN APIs

router.post("/sign-in",async(req, resp)=>{
 try{
  const {username} = req.body;
  const  {email} =  req.body ;
  const existingUser = await User.findOne({username});
  const existingEmail = await User.findOne({email});
  if(existingUser){
    return  resp.status(400).json({message:"username already exist"});
  }else if (username.length < 3){
    return  resp.status(400).json({message:"username should have atleast 4 char"});
  }
  if(existingEmail){
    return  resp.status(400).json({message:"Email already exist"});
  }
  const hashPass = await bcrypt.hash(req.body.password , 10);
  const newUser = new User({username:req.body.username,
       email: req.body.email,
       password :hashPass,
  });
  await newUser.save();
  return  resp.status(200).json({message:"sign sucessfully"});
 }  catch(error){
    console.log(error);
 }
});

router.post("/log-in", async (req ,resp)=>{
  const {username , password} = req.body;
  const existingUser = await User.findOne({username});
  if(!existingUser){
    return  resp.status(400).json({message:"username or password is incorrect"});}
   bcrypt.compare(password, existingUser.password,(err,data)=>{
    if(data){
      const authClaims = [{name:username},{jti:jwt.sign({},"tcmTM")}]
      const token = jwt.sign({authClaims},"tcmTM",{expiresIn:"2d"});
      resp.status(200).json({id:existingUser._id,token:token});
    }else{
      return  resp.status(400).json({message:"invalid Credentials "});
    }
    });
   });


module.exports = router;