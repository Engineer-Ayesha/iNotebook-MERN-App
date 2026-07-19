const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const fetchUser=require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const JWT_SECRET = process.env.JWT_SECRET;
// Route 1- signup end point-creating a user
router.post(
  "/signup",
  // validation checks
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success=true;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message:"Please fill all fields correctly"
      });
    }
    try {
      const { name, email, password } = req.body;
      //creating user
      const userExist = await User.findOne({ email: email });
      if (userExist) {
        return res.status(400).json({
          message: "User already Exist",
        });
      }
      const salt =await bcrypt.genSalt(10);
      const hashPassword= await bcrypt.hash(password,salt);
      const user = new User({
        name,
        email,
        password:hashPassword,
      });
      // save user
      await user.save();
      const data={
        user:{
          id:user.id
        }
      }
      const authToken= jwt.sign(data,jwtSecret);
      // return response of server to frontend
      res.json({
        success: "User added Successfully",
        authToken,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
);
//Route 2- login endpoint
router.post(
  "/login",
  //validation checks
  [
    body("email","Please enter a valid email").isEmail(),
    body("password","Please enter a password").exists(),
  ],
  async (req, res) => {
    let success=true;
    const errors=validationResult(req);
    const {email,password}=req.body;
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      const user= await User.findOne({email});
      //compare existing  email of user with current email
      if(!user){
       return res.status(400).json({error:"please enter correct data"});
       success=false;
      }
      //compare password 
      const comparePassword= await bcrypt.compare(password,user.password);
      if(comparePassword){
        const data={
          user:{
            id:user.id
          }
        }
        const authToken= jwt.sign(data,jwtSecret);
        //return response
        res.json({success:"user logged successfully",authToken});
      }else{
        res.status(400).json({error:"please enter correct data"});
      }
      
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
})
//Route 3 -get Logged User data
router.post("/getuser",fetchUser,async(req,res)=>{
    try {
    const userId=req.user.id;
    // fetch user data except password
    const userData=await User.findById(userId).select("-password");
    res.send(userData);
  } catch (error) {
    console.error(error);
      res.status(500).json({
        message: "Internal server error",
      });
  }

  }
  
)
module.exports = router;
