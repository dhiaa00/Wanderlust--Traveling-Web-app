import { User, verifySignUp, verifyUpdateUser } from "../models/User.js";
import { Offer } from "../models/Offer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";
import { Agency } from "../models/Agency.js";
import { Review } from "../models/Review.js";

const updateUser = async (req, res) => {
  try {
    const userid = req.params.id;
    let user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ message: "User not found", data: null });
    }

    const new_username = req.body.username;
    if (new_username === user.username) {
      return res
        .status(400)
        .json({ message: "You should enter a new username", data: null });
    }

    user = await User.findByIdAndUpdate(
      userid,
      { username: new_username },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "User updated successfully", data: user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", data: null });
  }
};

const updatePassword = async (req, res) => {
  const userid = req.params.id;
  let user = await User.findById(userid);
  if (!user) {
    return res.status(404).json({ message: "User not found", data: null });
  }

  const new_password = req.body.password;

  if (new_password === user.password) {
    return res
      .status(400)
      .json({ message: "You should enter a new password", data: null });
  }

  try {
    const hashedPassword = await bcrypt.hash(new_password, 10);

    user.password = hashedPassword;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_PASSWORD);

    res
      .status(200)
      .json({ message: "Password updated successfully", data: user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update password", error: error.message });
  }
};

const updateEmail = async (req, res) => {
  const userid = req.params.id;
  let user = await User.findById(userid);

  if (!user) {
    return res.status(404).json({ message: "User not found", data: null });
  }

  const new_email = req.body.email;

  if (new_email === user.email) {
    return res
      .status(400)
      .json({ message: "You should enter a new email", data: null });
  }

  try {
    const isMatched = await bcrypt.compare(new_email, user.email);
    if (isMatched) {
      return res
        .status(400)
        .json({ message: "Email already exists", data: null });
    }

    user.email = new_email;
    await user.save();

    res.status(200).json({ message: "Email updated successfully", data: user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update email", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const userid = req.params.id;
  try {
    const user = await User.findByIdAndDelete(userid);
    if (!user) {
      return res.status(404).json({ message: "User not found", data: null });
    }
    res.status(200).json({ message: "User deleted successfully", data: null });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
};

const verifyUser = async (req, res) => {
  const confirmationId = req.params.confirmationId;
  const verificationCode = req.body.verificationCode;
  try {
    const user = await User.findOne({ confirmationId: confirmationId });
    if (!user) {
      return res.status(404).json({ message: "User not found", data: null });
    }
    if (user.verificationCode !== verificationCode) {
      return res.status(400).json({
        message: "Invalid verification code",
        data: {
          verificationCode: req.body,
          typeofVerificationCode: typeof verificationCode,
          verificationCodeUser: user.verificationCode,
          typeofVerificationCodeUser: typeof user.verificationCode,
        },
      });
    }
    user.Verified = true;
    await user.save();
    res.status(200).json({ message: "User verified successfully", data: user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to verify user", error: error.message });
  }
};

const getOfferForUser = async (req, res) => {
  try {
    const offerId = req.params.id;
    const offer = await Offer.findById(offerId);
    if (!offer) {
      return res.status(404).json({ message: "Offer not found", data: null });
    }
    // send the offer without clients field and with adding agencyName using agency
    const agency = await Agency.findById(offer.agency);

    offer.clients = undefined;
    res.status(200).json({
      message: "Offer fetched successfully",
      data: {
        ...offer._doc,
        agencyName: agency.agencyName,
        agencyPhoto: agency.agencyPhoto,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch offer", error: error.message });
  }
};
const getAllOffersForUser = async (req, res) => {
  try {
    const offers = await Offer.find();
    res
      .status(200)
      .json({ message: "Offers fetched successfully", data: offers });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch offers", error: error.message });
  }
};

const updatePreferences = async (req, res) => {
  try {
    const userId = req.params.id;
    const preferences = req.body.preferences;
    let user = await User.findById(userId);
    if (!user) {
      user = await Agency.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found", data: null });
      }
    }
    user.preferences = preferences;
    await user.save();
    res.status(200).json({
      message: "Preferences updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update preferences",
      error: error.message,
    });
  }
};

const getRecommendation = async (req, res) => {
  try {
    const userId = req.body.userId;
    // if userId is -1 then return the first 5 offers by rating
    if (userId === -1) {
      try {
        const topReviews = await Review.find().sort({ rating: -1 }).limit(5);
        if (topReviews.length === 0) {
          // return any 5 offers
          const offers = await Offer.find().limit(5);
          return res.status(200).json({
            message: "Recommendations if if fetched successfully",
            data: offers,
          });
        }
        const offers = [];
        for (let i = 0; i < topReviews.length; i++) {
          const offer = await Offer.findById(topReviews[i].offerId);
          offers.push(offer);
        }
        return res.status(200).json({
          message: "Recommendations if fetched successfully",
          data: offers,
        });
      } catch (error) {
        return res.status(500).json({
          message: "Failed if case to fetch recommendations",
          error: error.message,
        });
      }
    }
    let userPreferencesObject = await Agency.findById(userId).select(
      "preferences"
    );
    if (!userPreferencesObject) {
      userPreferencesObject = await User.findById(userId).select("preferences");
    }
    const userPreferences = userPreferencesObject.preferences;
    const data = await Offer.find();

    const response = await axios.post("http://127.0.0.1:5000/recommendations", {
      userPreferences,
      data,
    });

    const recommendations_ids = response.data.recommendations;
    //get recommendations using ids list
    const recommendations = await Offer.find({
      _id: { $in: recommendations_ids },
    });

    res.status(200).json({
      message: "Recommendations fetched successfully",
      data: recommendations,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch recommendations",
      error: error.message,
    });
  }
};

export {
  updateEmail,
  updateUser,
  updatePassword,
  deleteUser,
  verifyUser,
  getOfferForUser,
  getAllOffersForUser,
  updatePreferences,
  getRecommendation,
};
