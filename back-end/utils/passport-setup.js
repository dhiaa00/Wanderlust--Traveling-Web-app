import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/User.js"; // Adjust the path to your User model
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: env.process.GOOGLE_CLIENT_ID,
      clientSecret: env.process.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "https://wanderlust-backend-server.onrender.com/auth/google/callback", // Replace with your callback URL
    },
    (accessToken, refreshToken, profile, done) => {
      // User profile is available in profile
      console.log(profile);
      try {
        const email = profile.emails[0].value;
        const name = profile.displayName;
        const profilePhoto = profile.photos[0].value;

        // Log the extracted information
        console.log("Google OAuth Profile:", profile);
        console.log("Extracted Email:", email);
        console.log("Extracted Name:", name);

        done(null, { email, name });
      } catch (error) {
        done(error, null);
      }
    }
  )
);
