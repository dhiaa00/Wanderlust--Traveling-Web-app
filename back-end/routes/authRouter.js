import { Router } from "express";
import {
  loginAgency,
  loginController,
  registerAgency,
  registerController,
  googleSignUp,
  logout,
} from "../controllers/authControllers.js";
import { verifyTokenAndAdmin, verifytoken } from "../utils/verifyToken.js";
import { auth } from "googleapis/build/src/apis/abusiveexperiencereport/index.js";

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

authRouter.route("/google").post(googleSignUp);

authRouter.route("/logout").get(logout);

export default authRouter;
