import jwt from 'jsonwebtoken';
import { userModel } from '../models/userModel.js';
 
const jwt_sing = "nielit_123";

export const verifyUser = (req, res) => {
  const jwtToken = req.header("jwtToken");
  if (!jwtToken) { 
    return res.status(401).json({'result': false})
  }
  try {
    jwt.verify(jwtToken, jwt_sing);
    return res.json({'result': true}) 
  } catch (error) {
    return res.status(401).json({'result': false})
  }
};


export const verifyJwt = async (req, res, next) => {
  const jwtToken = req.header("jwtToken"); 
  if (!jwtToken) {
    return res.status(400).json({ error: "please enter valid credientials" });
  }
  try {
    jwt.verify(jwtToken, jwt_sing);
    const { user_id } = jwt.decode(jwtToken);
    
    const user = await userModel.findById(user_id).lean();
    if (user == null){  
        throw Error("User not found");}
    req.body.user_id = user._id;
    req.body.user_name = user.name;  
    next()
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({error: 'Please Verify First'})
  }
};

export const verifyAdmin = async (req, res, next) => {
  const jwtToken = req.header("jwtToken"); 
  if (!jwtToken) {
    return res.status(400).json({ error: "please enter valid credientials" });
  }
  try {
    jwt.verify(jwtToken, jwt_sing);
    const admin = jwt.decode(jwtToken);
    
   
    if (!admin){  
      throw Error("User not found");
    } else if(admin.status=="admin"){
        next()
        }else{
      throw Error("please enter valid credientials");

        }
        
    
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({error: 'Please Verify First'})
  }
};