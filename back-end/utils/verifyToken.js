import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { Agency } from "../models/Agency.js";

const verifytoken = async (req, res, next) => {
  const token = req.cookies.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "acces denied,no token provided" });
  }
  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_PASSWORD);
    req.user = await User.findOne({ _id: decodedPayload.id });

    next();
  } catch (error) {
    return res.status(400).json({ message: "accces denied" });
  }
};
const verifyTokenAndUser = (req, res, next) => {
  try {
    if (req.user._id != req.params.id) {
      return res.status(403).json({ message: "forbidden only user himself" });
    }
    next();
  } catch (error) {
    console.error(error);
  }
};
const verifyTokenAndAdmin = (req, res, next) => {
  try {
    console.log(req.user.isAdmin);
    if (req.user.isAdmin == false) {
      return res.status(403).json({ message: "forbidden only admin himself" });
    }
    next();
  } catch (error) {
    console.error(error);
  }
};

const verifyTokenAndAgency = async (req, res, next) => {
  const token = req.cookies.authorization;
  if (!token) {
    return res.status(401).json({ message: "acces denied,no token provided" });
  }
  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_PASSWORD);
    req.agency = await Agency.findOne({ _id: decodedPayload.id });

    next();
  } catch (error) {
    return res.status(400).json({ message: "accces denied" });
  }
};

export {
  verifytoken,
  verifyTokenAndUser,
  verifyTokenAndAdmin,
  verifyTokenAndAgency,
};
