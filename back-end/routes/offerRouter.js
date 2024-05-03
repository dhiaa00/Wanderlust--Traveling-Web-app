import { Router } from "express";
import {
  createOffer,
  deleteOfferById,
  getAllOffers,
  getOfferById,
  updateOfferById,
} from "../controllers/offerControllers.js";
import {
  verifyTokenAndAgency,
  verifyTokenAndUser,
} from "../utils/verifyToken.js";

const offerRouter = Router();

offerRouter.route("/create").post(createOffer);

offerRouter.route("/getAll").post(getAllOffers);

offerRouter.route("/get/:id").get(verifyTokenAndAgency, getOfferById);

offerRouter.route("/update/:id").put(updateOfferById);

offerRouter.route("/delete/:id").delete(deleteOfferById);

export default offerRouter;
