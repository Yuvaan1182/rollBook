const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const User = require("../models/user.model");
const googleEnv = require("../config/env.config").oauth.google;

const setupGoogleStrategy = (passport) => {
  if (!googleEnv.clientID || !googleEnv.clientSecret || !googleEnv.callbackURL) {
    console.error("Google OAuth environment variables are not set properly.");
    return;
  } 
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleEnv.clientID,
        clientSecret: googleEnv.clientSecret,
        callbackURL: googleEnv.callbackURL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;
          let user = await User.findOne({ email });

          if (!user) {
            user = await User.create({
              email,
              name: profile.displayName,
              provider: "google",
              googleId: profile.id,
            });
          }

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
}

module.exports = setupGoogleStrategy;
