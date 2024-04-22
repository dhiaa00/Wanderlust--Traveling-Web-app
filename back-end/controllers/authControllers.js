import {User, verifySignUp, verifyLogin} from "../models/User.js"
import {Agency, verifyAgencyLogin, verifyAgencySignUp} from "../models/Agency.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
 
const loginController = async (req, res) => {
  const {error} = verifyLogin(req.body)
  if (error) {
    return res.status(400).json({message : error.details[0].message})
  }
  const {email,password} = req.body
  const user = await User.findOne({email})
  if (!user) {
    return res.status(404).json({message : "invalid email or password",data : null})
  }
  const isMatched = await bcrypt.compare(password,user.password)
  if (!isMatched) {
    return res.status(400).json({message : "invalid email or password",data : null})
    
  }
  const token = jwt.sign({id : user._id,isAdmin: user.isAdmin},process.env.JWT_PASSWORD,{expiresIn: "30d"})
  res.cookie("authorization",token,{secure :false ,httpOnly :true,sameSite : "strict"})
  return res.status(200).json({message : "login succefuly",data : user,maxAge : 1000 * 60 * 60 * 24 * 30})
};


const registerController = async (req,res) => {
  const {error} = verifySignUp(req.body)
  if (error) {
    return res.status(400).json({message : error.details[0].message})
  }
  const {username,password,email} = req.body


  let user = await User.findOne({email})
  
  if (user) {
    return res.status(400).json({message : "invalid email or password",data : null})
  }
  user = await User.create({
    username,
    email,
    password : await bcrypt.hash(password,10)
  })
  const token = jwt.sign({id : user._id,isAdmin: user.isAdmin},process.env.JWT_PASSWORD,{expiresIn: "30d"})
  res.cookie("authorization",token,{secure :false ,httpOnly :true,sameSite : "strict"})
  return res.status(201).json({message : "user Created succefuly",/*data : user*/})
}

const loginAgency = async (req, res) => {
  try {
    const { error } = verifyAgencyLogin(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    
    const { email, password } = req.body;
    const agency = await Agency.findOne({ email });
    if (!agency) {
      return res.status(404).json({ message: 'Invalid email or password', data: null });
    }
    
    const isMatched = await bcrypt.compare(password, agency.password);
    if (!isMatched) {
      return res.status(400).json({ message: 'Invalid email or password', data: null });
    }
    
    const token = jwt.sign({id : agency._id},process.env.JWT_PASSWORD,{expiresIn: "30d"})
    res.cookie("authorization",token,{secure :false ,httpOnly :true,sameSite : "strict"})
    return res.status(200).json({ message: 'Login successful'});
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const registerAgency = async (req, res) => {
  console.log(req.body)
  try {
    const { error } = verifyAgencySignUp(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { agencyName, registrationNumber, email, password, location, phoneNumber, website } = req.body;
    const existingAgency = await Agency.findOne({ email });
    if (existingAgency) {
      return res.status(400).json({ message: 'Agency already exists', data: null });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAgency = new Agency({
      agencyName,
      registrationNumber,
      email,
      password: hashedPassword,
      location,
      phoneNumber,
      website
    });
    await newAgency.save();
    const token = jwt.sign({id : agency._id},process.env.JWT_PASSWORD,{expiresIn: "30d"})
    res.cookie("authorization",token,{secure :false ,httpOnly :true,sameSite : "strict"})
    return res.status(201).json({ message: 'Agency created successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};



export { loginController, registerController, loginAgency, registerAgency};
