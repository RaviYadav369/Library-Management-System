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
      return res.status(404).json({
        success: false,
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
      data:users,
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
          message:"User Not Found"
      })
  }
  
  const updateUser = users.map((each) =>{
      if(each.id === id){
          return {
              ...each,
              ...data,
          };
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
    
   
     const getDateInDays = (data = "") => {
        let date;
        if (data === "") {
          //Current Date
          date = new Date();
        } else {
          //Date depend on data
          date = new Date(data);
        }
        let days = Math.floor(date / (1000 * 60 * 60 * 24));
        return days;
      };
  
      const subscriptionType = (date) => {
        if (user.subscriptionType === "Basic") {
          date = date + 90;
        } else if (user.subscriptionType === "Standard") {
          date = date + 180;
        } else if (user.subscriptionType === "Premium") {
          date = date + 365;
        }
        return date;
      };
  
      //Subscription Expiration
      //January 1, 1970 UTC
      let returnDate = getDateInDays(user.returnDate);
      let currentDate = getDateInDays();
      let subscriptionDate = getDateInDays(user.subscriptionDate);
      let subscriptionExpiration = subscriptionType(subscriptionDate);
  
      const data = {
        ...user,
        subscriptionExpiration: subscriptionExpiration < currentDate,
        daysLeftforExpiration:
          subscriptionExpiration <= currentDate
            ? 0
            : subscriptionExpiration - currentDate,
        fine:
          returnDate < currentDate
            ? subscriptionExpiration <= currentDate
              ? 200
              : 100
            : 0,
      };
      
    if(data.fine >0){
      res.status(404).json({
      success:false,
      message:`User have Some Fine = ${data.fine}`,
      suggestion:"You cannot delete this user",
     });
    }

    else{
      const index = users.indexOf(user);
      users.splice(index,1);
      res.status(202).json({
        success:true,
        data:users
      });
    }
    
});

 // Routes: /users/subscription-details/:id
  // Method:GET
  //Getting all user with subscriptionn details

router.get("/subcription-details/:id",(req,res)=>{
  const {id} = req.params;
  const user = users.find((each) => each.id === id)
  if(!user){
    return res.status(404).json({
      success:false,
      message:"User is not found with this id"
    });
  }

  const getDateInDays = (data ="") =>{
    let date ;
    if(data === ""){
      //Current Date
      date = new Date();
    }
    else{
      //Date depend on data
      date = new Date(data);
    }
    let days = Math.floor(date / (1000*60*60*24));
    return days;
  };

  const subscriptionType = (date) =>{
    if(user.subscriptionType === "Basic"){
      date = date +90;
    }
    else if(user.subscriptionType === "Standard"){
      date = date +180;
    }
    else if(user.subscriptionType === "Premium"){
      date = date +365;
    }
    return date;
  };

//Subscription Expiration
//January 1, 1970 UTC
let returnDate = getDateInDays(user.returnDate);
let currentDate = getDateInDays();
let subscriptionDate = getDateInDays(user.subscriptionDate);
let subscriptionExpiration = subscriptionType(subscriptionDate)

const  data = {
  ...user,
  subscriptionExpiration: subscriptionExpiration < currentDate,
  daysLeftforExpiration:
  subscriptionExpiration <= currentDate ? 0 :subscriptionExpiration - currentDate,
  fine:
  returnDate < currentDate ? 
  subscriptionExpiration <= currentDate ? 200 : 100
   : 0,
}
res.status(200).json({
  success: true,
  data,
});
});



module.exports = router;