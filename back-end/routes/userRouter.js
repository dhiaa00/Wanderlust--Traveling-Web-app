import { Router } from "express";
import {
  deleteUser,
  getAllOffersForUser,
  getOfferForUser,
  getRecommendation,
  updateEmail,
  updatePassword,
  updatePreferences,
  updateUser,
  verifyUser,
} from "../controllers/userControllers.js";
import generateResponse from "../utils/generateResponse.js";

const userRouter = Router();
userRouter.route("/verify/:confirmationId").post(verifyUser);

userRouter.route("/update/username/:id").put(updateUser);

userRouter.route("/update/email/:id").put(updateEmail);

userRouter.route("/update/password/:id").put(updatePassword);

userRouter.route("/delete/:id").delete(deleteUser);

userRouter.route("/getOffer/:id").get(getOfferForUser);

userRouter.route("/getOffers").get(getAllOffersForUser);

userRouter.route("/updatePreferences/:id").post(updatePreferences);

userRouter.route("/getRecommendation").post(getRecommendation);

userRouter.route("/generateResponse").get(generateResponse);

export default userRouter;
