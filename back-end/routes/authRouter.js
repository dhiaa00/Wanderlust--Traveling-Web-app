import { Router } from "express";
import {
  loginAgency,
  loginController,
  registerAgency,
  registerController,
  googleLogin,
  googleCallback, // New import for handling Google login
} from "../controllers/authControllers.js"; // Add googleLogin if it's in your controller
import { verifyTokenAndAdmin, verifytoken } from "../utils/verifyToken.js";

const authRouter = Router();

// User login
authRouter.route("/user/login").post(loginController);

// User registration
authRouter.route("/user/register").post(registerController);

// Admin route (secured)
authRouter.route("/admin").get(verifytoken, verifyTokenAndAdmin, (req, res) => {
  return res.status(200).json({ message: "hello from test" });
});

// Agency registration
authRouter.route("/agency/register").post(registerAgency);

// Agency login
authRouter.route("/agency/login").post(loginAgency);

// Google login route
authRouter.route("/google").get(googleLogin); // Update the handler to googleLogin

// Callback route for Google to redirect to
authRouter.route("/google/callback").get(googleCallback); // Update the handler to googleCallback

export default authRouter;
