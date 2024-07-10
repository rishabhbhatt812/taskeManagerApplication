const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
    unique:true,
  },
  desc:{
    type:String,
    required:true,
    unique:true,
  },
  important:{
    type:Boolean,
    default:false ,
},
completed:{
  type:Boolean,
  default:true,
}
},{
  timestamps:true,
});

module.exports = mongoose.model("task", TaskSchema);