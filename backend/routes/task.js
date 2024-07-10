const router = require("express").Router();
const Task = require("../models/task");
const User = require("../models/user");
const { authanticateToken } = require("./auth");

router.post("/create-task",authanticateToken ,
   async(req,resp)=>{
  try {
    const {title , desc} = req.body ;
    const {id} = req.headers ;
    const newTask = new Task({title:title , desc:desc});
    const saveTask = await newTask.save();
    const taskId = saveTask._id ;
    await User.findByIdAndUpdate(id , {$push:{tasks:taskId._id}});
    resp.status(200).json({message:"Task created"});
  } catch (error) {
    console.log(error);
    resp.status(400).json(error);
  }
});

//Get All Tasks
router.get("/get-all-tasks", authanticateToken , async(req, resp)=>{
  try {
    const {id} = req.headers ; 
   const userData = await User.findById(id).populate({path:"tasks",options:{sort:{createdAt:-1}}}); //populate := for desplay all task with there data 
   resp.status(200).json({data:userData});
  } catch (error) {
    resp.status(400).json({message:"Internal Servar Error"});
  }
} );

//Delete Task 

router.delete("/delete-task/:id", authanticateToken , async(req, resp)=>{
  try {
    const {id} = req.params ; 
    const userId = req.headers.id ;
    await Task.findByIdAndDelete(id);
   await User.findByIdAndUpdate(userId,{$pull:{tasks: id}});
   resp.status(200).json({message:"Task deleted successfully"});
  } catch (error) {
    resp.status(400).json({message:"Internal Servar Error"});
  }
} );


//Update Task 
router.put("/update-task/:id", authanticateToken , async(req, resp)=>{
  try {
    const {id} = req.params ; 
    const {title , desc} = req.body;
    await Task.findByIdAndUpdate(id,{title:title , desc:desc});
   resp.status(200).json({message:"Task Updated successfully"});
  } catch (error) {
    resp.status(400).json({message:"Internal Servar Error"});
  }
 } );

 //Update Important Task
 router.put("/update-imp-task/:id", authanticateToken , async(req, resp)=>{
  try {
    const {id} = req.params ; 
    const TaskData = await Task.findById(id);
    const ImpTask = TaskData.important;
    await Task.findByIdAndUpdate(id,{important: !ImpTask});
   resp.status(200).json({message:"Task Updated successfully"});
  } catch (error) {
    resp.status(400).json({message:"Internal Servar Error"});
  }
 } );

//Complete Task
router.put("/complete-task/:id", authanticateToken , async(req, resp)=>{
  try {
    const {id} = req.params ; 
    const TaskData = await Task.findById(id);
    const CompleteTask = TaskData.completed;
    await Task.findByIdAndUpdate(id,{completed: !CompleteTask});
   resp.status(200).json({message:"Task Updated successfully"});
  } catch (error) {
    resp.status(400).json({message:"Internal Servar Error"});
  }
 } );

//Get Important Task
router.get("/get-imp-tasks", authanticateToken , async(req, resp)=>{
  try {
    const {id} = req.headers ; 
   const Data = await User.findById(id).populate(
    {path:"tasks",
      match:{important:true},
      options:{sort:{createdAt:-1}}});
     //populate := for desplay all task with there data 
  const ImpTaskData = Data.tasks ;
   resp.status(200).json({data:ImpTaskData});
  } catch (error) {
    resp.status(400).json({message:"Internal Servar Error"});
  }
} );

//Get completed Task 
router.get("/get-completed-tasks", authanticateToken , async(req, resp)=>{
  try {
    const {id} = req.headers ; 
   const Data = await User.findById(id).populate(
    {path:"tasks",
      match:{completed:true},
      options:{sort:{createdAt:-1}}});
     //populate := for desplay all task with there data 
  const CompletedTaskData = Data.tasks ;
   resp.status(200).json({data:CompletedTaskData});
  } catch (error) {
    resp.status(400).json({message:"Internal Servar Error"});
  }
} );

//Get Incompleted Task
router.get("/get-incompleted-tasks", authanticateToken , async(req, resp)=>{
  try {
    const {id} = req.headers ; 
   const Data = await User.findById(id).populate(
    {path:"tasks",
      match:{completed:false},
      options:{sort:{createdAt:-1}}});
     //populate := for desplay all task with there data 
  const InCompletedTaskData = Data.tasks ;
   resp.status(200).json({data:InCompletedTaskData});
  } catch (error) {
    resp.status(400).json({message:"Internal Servar Error"});
  }
} );

module.exports = router ;