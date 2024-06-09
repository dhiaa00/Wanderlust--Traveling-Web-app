import { User } from "../models/User.js";
import { Review } from "../models/Review.js";
import { Offer } from "../models/Offer.js";

const createReview = async (req, res) => {
  const { userId, offerId, rating, comment } = req.body;

  try {
    // Check if userId and offerId are valid
    const user = await User.findById(userId);
    const offer = await Offer.findById(offerId);

    if (!user) {
      return res
        .status(404)
        .json({ message: "Only tourists can review offers", data: null });
    }

    if (!offer) {
      return res.status(404).json({ message: "Offer not found", data: null });
    }

    // Check if the user has already reviewed the offer
    const existingReview = await Review.findOne({ userId, offerId });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this offer" });
    }

    // Create new review
    const review = new Review({
      userId,
      offerId,
      rating,
      comment,
    });

    // Save the review to the database
    await review.save();

    // Calculate the new rating for the offer
    const newRating = await calculateOfferRating(offerId);
    offer.rating = newRating;
    await offer.save();

    res
      .status(201)
      .json({ message: "Review created successfully", data: review });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create review", error: error.message });
  }
};

const getReviewsByOffer = async (req, res) => {
  const offerId = req.params.offerId;

  try {
    // Find all reviews for the given offer
    const reviews = await Review.find({ offerId });

    res
      .status(200)
      .json({ message: "Reviews found successfully", data: reviews });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get reviews", error: error.message });
  }
};

const calculateOfferRating = async (offerId) => {
  try {
    const reviews = await Review.find({ offerId });
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / reviews.length;
  } catch (error) {
    return 0;
  }
};

const updateReview = async (req, res) => {
  const reviewId = req.params.id;
  const { rating, comment } = req.body;

  try {
    let review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found", data: null });
    }

    review.rating = rating;
    review.comment = comment;

    review = await review.save();

    res
      .status(200)
      .json({ message: "Review updated successfully", data: review });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update review", error: error.message });
  }
};

const deleteReview = async (req, res) => {
  const reviewId = req.params.id;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found", data: null });
    }

    await Review.findByIdAndDelete(reviewId);

    res
      .status(200)
      .json({ message: "Review deleted successfully", data: null });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete review", error: error.message });
  }
};

export {
  getReviewsByOffer,
  createReview,
  calculateOfferRating,
  updateReview,
  deleteReview,
};
