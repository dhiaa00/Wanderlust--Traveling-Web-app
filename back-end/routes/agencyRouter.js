import { Router } from "express";
import {
  deleteAgency,
  getProfileImage,
  updateAgencyEmail,
  updateAgencyName,
  updateAgencyPhoto,
  updateAgencyPassword,
  verifyAgency,
  updateAgencyLocation,
  updateAgencyBio,
} from "../controllers/agencyControllers.js";
import { verifytoken, verifyTokenAndAgency } from "../utils/verifyToken.js";

const agencyRouter = Router();

agencyRouter.route("/verify/:confirmationId").post(verifyAgency);

agencyRouter
  .route("/update/username/:id")
  .put(verifytoken, verifyTokenAndAgency, updateAgencyName);

agencyRouter
  .route("/update/profilePhoto/:id")
  .put(verifytoken, verifyTokenAndAgency, updateAgencyPhoto);

agencyRouter
  .route("/update/location/:id")
  .put(verifytoken, verifyTokenAndAgency, updateAgencyLocation);

agencyRouter
  .route("/update/bio/:id")
  .put(verifytoken, verifyTokenAndAgency, updateAgencyBio);

agencyRouter
  .route("/update/password/:id")
  .put(verifytoken, verifyTokenAndAgency, updateAgencyPassword);

agencyRouter
  .route("/update/email/:id")
  .put(verifytoken, verifyTokenAndAgency, updateAgencyEmail);

agencyRouter
  .route("/delete/:id")
  .delete(verifytoken, verifyTokenAndAgency, deleteAgency);

agencyRouter
  .route("/profileImage/:id")
  .get(verifytoken, verifyTokenAndAgency, getProfileImage);

export default agencyRouter;
