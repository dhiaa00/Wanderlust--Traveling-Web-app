import { Router } from "express";
import {
  createReview,
  deleteReview,
  getReviewsByOffer,
  updateReview,
} from "../controllers/reviewControllers.js";

const reviewRouter = Router();

reviewRouter.route("/create").post(createReview);

reviewRouter.route("/get/:offerId").post(getReviewsByOffer);

reviewRouter.route("/delete/:id").delete(deleteReview);

reviewRouter.route("/update/:id").put(updateReview);

export default reviewRouter;
