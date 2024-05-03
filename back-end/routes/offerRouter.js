import { Router } from "express";
import {
  createOffer,
  deleteOfferById,
  getAllOffers,
  getOfferById,
  updateOfferById,
} from "../controllers/offerControllers.js";

const offerRouter = Router();

offerRouter.route("/create").post(createOffer);

offerRouter.route("/getAll").post(getAllOffers);

offerRouter.route("/get/:id").get(getOfferById);

offerRouter.route("/update/:id").put(updateOfferById);

offerRouter.route("/delete/:id").delete(deleteOfferById);

export default offerRouter;
