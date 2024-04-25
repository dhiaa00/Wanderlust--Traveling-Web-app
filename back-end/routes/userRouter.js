import { Router } from "express";
import {
  deleteUser,
  updateEmail,
  updatePassword,
  updateUser,
  verifyUser,
} from "../controllers/userControllers.js";

const userRouter = Router();
userRouter.route("/verify/:confirmationId").post(verifyUser);

userRouter.route("/update/username/:id").put(updateUser);

userRouter.route("/update/email/:id").put(updateEmail);

userRouter.route("/update/password/:id").put(updatePassword);

userRouter.route("/delete/:id").delete(deleteUser);

export default userRouter;
