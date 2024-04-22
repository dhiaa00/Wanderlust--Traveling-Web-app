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
    // profilePhoto: {
    //   type: Object,
    //   default: {
    //     url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png ",
    //     publicId: null,
    //   },
    // },
    // bio: String, // or bio: {type:String }, when we have only one value we can do it like this
    isAdmin: {
      type: Boolean,
      default: false,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer'
      }
    ],
  
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
    password: joiPasswordComplexity().required(),
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
    password: joi.string().required().trim().min(8).max(100),
  });

  return loginSchema.validate(obj);
};

const verifyUpdateUser = (obj) => {
  const schema = joi.object({
    username: joi.string().trim().min(2).max(20),
    password: joiPasswordComplexity(),
    // bio: joi.string(),
  });
  return schema.validate(obj);
};

const User =  mongoose.model("user", Schema); // mongo db will add s and make it in small case and add document with the name users that have UserSchema
export {User, verifySignUp, verifyUpdateUser, verifyLogin}


// import mongoose from "mongoose"

// const schema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       trim: true,
//       minlength: 5,
//       maxlength: 20,
//     },
//     email: {
//       type: String,
//       required: true,
//       trim: true,
//       minlength: 5,
//       unique : true,
//       maxlength: 50,
//     },
//     password: {
//       type: String,
//       required: true,
//       trim: true,
//       minlength: 8,
//     },
//     // todos : [{ title: String, description: String }],
//   },
//   { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
// );

// const User = mongoose.model.User ||mongoose.model("User", schema);


// export {User}

// // import mongoose from "mongoose";
// // import joi, { ref } from "joi";
// // import { UserSignIn, UserSignUp } from "../types/interfaces";

// // const userSchema = new mongoose.Schema(
// //   {
// //     username: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //       minlength: 5,
// //       maxlength: 20,
// //     },
// //     email: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //       minlength: 5,
// //       unique : true,
// //       maxlength: 50,
// //     },
// //     password: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //       minlength: 8,
// //     },
// //     // todos : [{ title: String, description: String }],
// //   },
// //   { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
// // );

// // userSchema.virtual("todos", {
// //   // new propertie : posts : []
// //   ref: "Todo", // reference to Post model
// //   foreignField: "user", // the foreign field in the todos model that point to the user
// //   localField: "_id", // get all post that have user == _id (in other way the where todos model point )
// // });

// // const User = mongoose.models.User || mongoose.model("User", userSchema);

// // const signInValidator = (obj: UserSignIn) => {
// //   const Schema = joi.object({
// //     email: joi.string().trim().min(5).max(50).required(),
// //     password: joi.string().trim().min(8).required(),
// //   });
// //   return Schema.validate(obj);
// // };

// // const signUpValidator = (obj: UserSignUp) => {
// //   const Schema = joi.object({
// //     username: joi.string().trim().min(5).max(20).required(),
// //     email: joi.string().trim().min(5).max(50).required(),
// //     password: joi.string().trim().min(8).required(),
// //   });
// //   return Schema.validate(obj);
// // };
// // const updateUserValidator = (obj: UserSignUp) => {
// //   const Schema = joi.object({
// //     username: joi.string().trim().min(5).max(20),
// //     email: joi.string().trim().min(5).max(50),
// //     password: joi.string().trim().min(8),
// //   });
// //   return Schema.validate(obj);
// // };

// // export { User, signUpValidator, signInValidator,updateUserValidator };
