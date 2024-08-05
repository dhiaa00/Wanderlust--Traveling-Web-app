import { Router } from "express";
import {
  loginAgency,
  loginController,
  registerAgency,
  registerController,
  handleGoogleSignup, // New import for handling Google login
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

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  // Assuming passport attaches user information to req.user
  handleGoogleSignup(req, res);
});

export default authRouter;
