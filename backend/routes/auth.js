const jwt = require("jsonwebtoken");

const authanticateToken = (req,resp , next)=>{
  
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if(token == null){ 
    return resp.status(401).json({message:"Authentication token required"});
}

 
jwt.verify(token,"tcmTM",(err, user)=>{
  if(err){
    return resp.status(403).json(err);
  }
  req.user = user;
  next();
});

};

module.exports = { authanticateToken}