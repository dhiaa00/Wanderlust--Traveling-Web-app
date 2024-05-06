import { Router } from "express";
import {
  addCollaboration,
  createOffer,
  deleteOfferById,
  getAllOffers,
  getOfferById,
  offerSearch,
  updateOfferById,
} from "../controllers/offerControllers.js";
import { verifyTokenAndAgency } from "../utils/verifyToken.js";

const offerRouter = Router();

offerRouter.route("/create").post(createOffer);

offerRouter.route("/getAll").post(verifyTokenAndAgency, getAllOffers);

offerRouter.route("/get/:id").get(verifyTokenAndAgency, getOfferById);

offerRouter.route("/update/:id").put(updateOfferById);

offerRouter.route("/delete/:id").delete(deleteOfferById);

offerRouter.route("/search").post(verifyTokenAndAgency, offerSearch);

offerRouter
  .route("/addCollaboration/:id")
  .post(verifyTokenAndAgency, addCollaboration);

export default offerRouter;
