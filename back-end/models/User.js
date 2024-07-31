import mongoose from "mongoose";
import joi from "joi";
import jwt from "jsonwebtoken";
import joiPasswordComplexity from "joi-password-complexity";

const Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 50,
      unique: true,
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

    profilePhoto: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    preferences: {
      type: Array,
      default: [],
    },
    // bio: String, // or bio: {type:String }, when we have only one value we can do it like this
    isAdmin: {
      type: Boolean,
      default: false,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offer",
      },
    ],

    googleId: String,

    // isAccountVerified: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
); // to add 2 properties created at and updated at

const verifySignUp = (object) => {
  const Schema = joi.object({
    username: joi.string().required().trim().min(2).max(20),
    email: joi.string().required().trim().min(5).max(50).email(),
    password: joiPasswordComplexity({
      min: 8,
      max: 100,
      upperCase: 1,
      lowerCase: 1,
      numeric: 1,
    }).required(),
    // profilePhoto: joi.object().default({
    //     url : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png ",
    //     publicId: null,
    // }),
    // bio: joi.string(),
    // isAdmin: joi.bool().default(false),
    // isAccountVerified: joi.bool().default(false)
  });

  return Schema.validate(object);
};
const verifyLogin = (obj) => {
  const loginSchema = joi.object({
    email: joi.string().required().trim().min(5).max(50).email(),
    password: joiPasswordComplexity({
      min: 8,
      max: 100,
      upperCase: 1,
      lowerCase: 1,
      numeric: 1,
    }).required(),
  });

  return loginSchema.validate(obj);
};

const verifyUpdateUser = (obj) => {
  const schema = joi.object({
    username: joi.string().trim().min(2).max(20),
    password: joiPasswordComplexity({
      min: 8,
      max: 100,
      upperCase: 1,
      lowerCase: 1,
      numeric: 1,
    }).required(),
    // bio: joi.string(),
  });
  return schema.validate(obj);
};

const User = mongoose.model("user", Schema); // mongo db will add s and make it in small case and add document with the name users that have UserSchema
export { User, verifySignUp, verifyUpdateUser, verifyLogin };
