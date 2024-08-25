import mongoose from "mongoose";

const revokedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true, // Ensure each token is unique
  },
});

const RevokedToken = mongoose.model("RevokedToken", revokedTokenSchema);

export { RevokedToken };
