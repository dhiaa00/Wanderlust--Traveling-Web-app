import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/User.js"; // Adjust the path to your User model
import dotenv from "dotenv";

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Extract user information from profile object
        const { id, displayName, emails, photos } = profile;

        // Find or create user based on profile ID or email
        User.findOne({ googleId: id }, (err, existingUser) => {
          if (err) {
            return done(err);
          }

          if (!existingUser) {
            // Create a new user
            const newUser = new User({
              googleId: id,
              displayName,
              email: emails[0].value,
              photo: photos[0].value,
            });

            newUser.save((err) => {
              if (err) {
                return done(err);
              }
              return done(null, newUser);
            });
          } else {
            // Existing user found
            return done(null, existingUser);
          }
        });
      } catch (err) {
        done(err, null);
      }
    }
  )
);
