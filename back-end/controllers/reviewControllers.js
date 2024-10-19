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
      username: user.username,
      profilePhoto: user.profilePhoto,
    });

    // Save the review to the database
    await review.save();

    // Calculate the new rating for the offer
    const newRating = await calculateOfferRating(offerId);
    offer.rating = newRating;
    await offer.save();

    // trigger a notification
    const notification = new Notification({
      type: "NEW_REVIEW",
      userId: offer.userId,
      message: `${user.username} reviewed your offer`,
      link: `offer/${offerId}`,
    });

    await notification.save();

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
  const userId = req.body.userId;
  const reviewSlice = req.body.reviewSlice;
  try {
    // Find all reviews for the given offer
    const reviews = await Review.find({ offerId });

    // put the user's review first one if it exist
    if (userId) {
      const userReviewIndex = reviews.findIndex(
        (review) => review.userId.toString() == userId
      );
      if (userReviewIndex !== -1) {
        const userReview = reviews.splice(userReviewIndex, 1);
        reviews.unshift(userReview[0]);
      }
    }

    // Slice the reviews array to return only the requested reviews
    const slicedReviews = reviews.slice(
      reviewSlice * 10,
      reviewSlice * 10 + 10
    );
    const hasMore = reviews.length > reviewSlice * 10 + 10;

    const userReviewed = reviews[0]?.userId.toString() === userId;

    res.status(200).json({
      message: "Reviews found successfully",
      data: slicedReviews,
      hasMore,
      userReviewed,
    });
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
