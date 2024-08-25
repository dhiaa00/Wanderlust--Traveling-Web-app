import Joi from "joi";
import mongoose from "mongoose";
import joiPasswordComplexity from "joi-password-complexity";

const agencySchema = new mongoose.Schema(
  {
    agencyPhoto: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
    },
    agencyName: {
      type: String,
      required: true,
      trim: true,
    },
    registrationNumber: {
      type: String, // Assuming registration number can contain characters as well
      required: true,
      unique: true, // Ensure registration numbers are unique
    },
    email: {
      type: String,
      required: true,
      lowercase: true, // Convert email to lowercase before saving
      trim: true,
      unique: true, // Ensure email addresses are unique
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    preferences: {
      type: Array,
      default: [],
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 100,
      required: true,
      trim: true,
    },
    verificationCode: {
      type: String,
      length: 6,
      trim: true,
    },
    confirmationId: {
      type: String,
      trim: true,
      unique: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
agencySchema.virtual("offers", {
  ref: "Offer",
  localField: "_id",
  foreignField: "agency",
});

const verifyAgencyLogin = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: joiPasswordComplexity({
      min: 8,
      max: 100,
      upperCase: 1,
      lowerCase: 1,
      numeric: 1,
    }).required(),
  });
  return schema.validate(body);
};

const verifyAgencySignUp = (body) => {
  const schema = Joi.object({
    agencyName: Joi.string().required(),
    registrationNumber: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required().min(10).max(10),
    location: Joi.string().required(),
    password: joiPasswordComplexity({
      min: 8,
      max: 100,
      upperCase: 1,
      lowerCase: 1,
      numeric: 1,
    }).required(),
  });
  return schema.validate(body);
};

const Agency = mongoose.model("Agency", agencySchema);

export { Agency, verifyAgencyLogin, verifyAgencySignUp };
