import mongoose from "mongoose";

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
      trim: true, // Trim whitespace from the beginning and end of the string
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
    Verified: {
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
  const { email, password } = body;
  if (!email || !password) {
    return {
      error: { details: [{ message: "Email and password are required" }] },
    };
  }
  return { error: null };
};

const verifyAgencySignUp = (body) => {
  const { agencyName, registrationNumber, email, password } = body;
  if (!agencyName || !registrationNumber || !email || !password) {
    return { error: { details: [{ message: "All fields are required" }] } };
  }
  return { error: null };
};

const Agency = mongoose.model("Agency", agencySchema);

export { Agency, verifyAgencyLogin, verifyAgencySignUp };
