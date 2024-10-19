import { User, verifySignUp, verifyLogin } from "../models/User.js";
import {
  Agency,
  verifyAgencyLogin,
  verifyAgencySignUp,
} from "../models/Agency.js";
import { RevokedToken } from "../models/RevokedToken.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendVerificationCode from "../utils/sendVerificationCode.js";
import oauth2Client from "../utils/oauth2client.js";

const loginController = async (req, res) => {
  const { error } = req.body.password != "password" && verifyLogin(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .json({ message: "invalid email or password", data: null });
  }
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    return res
      .status(400)
      .json({ message: "invalid email or password", data: null });
  }

  if (!user.verified) {
    // resend a verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000); // generates a six digit number
    user.verificationCode = verificationCode;
    await user.save();
    sendVerificationCode(email, verificationCode);
    return res.status(400).json({
      message: "Please verify your email",
      confirmationId: user.confirmationId,
    });
  }

  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_PASSWORD,
    { expiresIn: "30d" }
  );
  res.cookie("authorization", token, {
    secure: false,
    httpOnly: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
  user.password = undefined;
  return res.status(200).json({
    message: "login succefuly",
    data: user,
  });
};

const registerController = async (req, res) => {
  const { error } = verifySignUp(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { username, password, email } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return res
      .status(400)
      .json({ message: "invalid email or password", data: null });
  }

  // generate the confirmationId for email
  const confirmationId = crypto.randomBytes(10).toString("hex");
  // generate verification code
  const verificationCode = Math.floor(100000 + Math.random() * 900000); // generates a six digit number
  sendVerificationCode(email, verificationCode);
  user = await User.create({
    username,
    email,
    password: await bcrypt.hash(password, 10),
    verificationCode,
    confirmationId,
  });
  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_PASSWORD,
    { expiresIn: "30d" }
  );
  res.cookie("authorization", token, {
    secure: false,
    httpOnly: true,
    sameSite: "strict",
  });
  return res.status(201).json({
    message: "user Created succefuly",
    confirmationId: confirmationId,
  });
};

const loginAgency = async (req, res) => {
  try {
    const { error } = verifyAgencyLogin(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;
    const agency = await Agency.findOne({ email });
    if (!agency) {
      return res
        .status(404)
        .json({ message: "Invalid email or password", data: null });
    }

    const isMatched = await bcrypt.compare(password, agency.password);
    if (!isMatched) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", data: null });
    }

    if (!agency.verified) {
      // resend a verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000); // generates a six digit number
      agency.verificationCode = verificationCode;
      await agency.save();
      sendVerificationCode(email, verificationCode);
      return res.status(400).json({
        message: "Please verify your email",
        confirmationId: agency.confirmationId,
      });
    }

    const token = jwt.sign({ id: agency._id }, process.env.JWT_PASSWORD, {
      expiresIn: "30d",
    });
    res.cookie("authorization", token, {
      secure: false,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    const { agencyPassword, ...agencyDataWithoutPassword } = agency._doc;
    return res
      .status(200)
      .json({ message: "Login successful", data: agencyDataWithoutPassword });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const registerAgency = async (req, res) => {
  try {
    const { error } = verifyAgencySignUp(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const {
      agencyName,
      registrationNumber,
      email,
      password,
      location,
      phoneNumber,
    } = req.body;
    const existingAgency = await Agency.findOne({ email });
    if (existingAgency) {
      return res
        .status(400)
        .json({ message: "Agency already exists", data: null });
    }

    // generate the confirmationId for email
    let confirmationId = crypto.randomBytes(10).toString("hex");
    // verify if the confirmationId is unique
    let existingConfirmationId = await Agency.findOne({ confirmationId });
    while (existingConfirmationId) {
      confirmationId = crypto.randomBytes(10).toString("hex");
      existingConfirmationId = await Agency.findOne({ confirmationId });
    }
    // generate verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000); // generates a six digit number
    sendVerificationCode(email, verificationCode);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAgency = new Agency({
      agencyName,
      registrationNumber,
      email,
      password: hashedPassword,
      location,
      phoneNumber,
      verificationCode: verificationCode,
      confirmationId: confirmationId,
    });
    await newAgency.save();
    const token = jwt.sign({ id: newAgency._id }, process.env.JWT_PASSWORD, {
      expiresIn: "30d",
    });
    res.cookie("authorization", token, {
      secure: false,
      httpOnly: true,
      sameSite: "strict",
    });
    return res.status(201).json({
      message: "Agency created successfully",
      confirmationId: confirmationId,
    });
    // send verification code to email
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

const googleSignUp = async (req, res) => {
  try {
    const credential = req.body.credential;
    const ticket = await oauth2Client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userId = payload["sub"];
    const email = payload.email;
    const name = payload.name;
    const picture = payload.picture;

    // Find or create user based on userId or email
    const user = await User.findOne({ email });
    if (!user) {
      // Create new user
      const newUser = new User({
        email,
        username: name,
        profilePhoto: picture,
        googleId: userId,
        verified: true,
      });
      await newUser.save();
      console.log("New user created:", newUser._id);
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_PASSWORD,
        { expiresIn: "30d" }
      );
      res.cookie("authorization", token, {
        secure: false,
        httpOnly: true,
        sameSite: "strict",
      });
      res
        .status(200)
        .json({ message: "User signed up successfully", user: newUser });
    } else {
      // verify if he used signup email or google oauth
      if (user.googleId) {
        // user already signed up with google
        // login user
        const token = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.JWT_PASSWORD,
          { expiresIn: "30d" }
        );
        res.cookie("authorization", token, {
          secure: false,
          httpOnly: true,
          sameSite: "strict",
        });
        res.status(200).json({ message: "Login successful", user });
      } else {
        // user signed up with email
        res.status(400).json({
          message: "Email already exists, please login with email",
        });
      }
    }
  } catch (error) {
    console.error("Error signing up with Google:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Add token to revoked tokens list
    const revokedT = new RevokedToken({ token });
    await revokedT.save();

    res.clearCookie("jwt");
    res.sendStatus(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export {
  loginController,
  registerController,
  loginAgency,
  registerAgency,
  googleSignUp,
  logout,
};
