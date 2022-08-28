const express = require('express');

const {users} = require("../data/users.json");

const router = express.Router();


// Routes: /users
// Method:GET
//getting all user
router.get("/", (req, res) => {
    res.status(200).json({
      success: true,
      data: users,
    });
});
  
  // Routes: /users/id
  // Method:GET
  //getting single user
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      data: user,
    });
});
  
  // Routes: /users/id
  // Method:POST
  //Create new user
router.post("/", (req, res) => {
    
    const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;
    const user = users.find((each) => each.id === id);
    if (user) {
      return res.status(200).json({
        success: true,
        message: "User is Already Exit With This id",
      });
    }
    users.push({
      id,
      name,
      surname,
      email,
      subscriptionType,
      subscriptionDate,
    });
  
    return res.status(200).json({
      success:true,
      message:users
    });
  
});
  
  // Routes: /users/id
  // Method:Put
  //Updates the user
  
router.put('/:id',(req,res)=>{
  const {id} = req.params;
  const { data }  = req.body;
  const user = users.find((each) => each.id ===id);
  if(!user){
      return res.status(404).json({
          success:false,
          message:"Page Not Found"
      })
  }
  
  const updateUser = users.map((each) =>{
      if(each.id === id){
          return {
              ...each,
              ...data,
          }
      }
      return each
  });
  
  return res.status(200).json({
      success:true,
      data:updateUser,
  });
});
  
  // Routes: /users/id
  // Method:delete
  //delete the user by id
  
router.delete('/:id',(req,res)=>{
    const {id} =req.params;
    const user = users.find((each)=> each.id === id);
    if(!user){
      return res.status(404).json({
        success:false,
        message:"User is Not Found for delete"
      });
    }
  
    const index = users.indexOf(user);
    users.splice(index,1);
    res.status(202).json({
      success:true,
      data:users
    });
});
  
module.exports = router