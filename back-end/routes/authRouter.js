import { Router } from "express";
import {loginAgency, loginController, registerAgency, registerController} from "../controllers/authControllers.js"
import { verifyTokenAndAdmin, verifytoken } from "../utils/verifyToken.js";

const authRouter = Router();


authRouter.route("/user/login").post(loginController);

authRouter.route("/user/register").post(registerController);

authRouter.route("/admin").get(verifytoken,verifyTokenAndAdmin,(req,res,next) => {return res.status(200).json({message: "hello from test"})});

authRouter.route("/agency/register").post(registerAgency);

authRouter.route("/agency/login").post(loginAgency);


export default authRouter;
