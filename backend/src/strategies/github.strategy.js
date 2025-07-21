// strategies/github.strategy.js
const { Strategy: GitHubStrategy } = require("passport-github2");
const User = require("../models/user.model");
const githubEnv = require("../config/env.config").oauth.github;

function setupGitHubStrategy(passport) {
  console.log("githubEnv", githubEnv);
  console.log("GitHub Client ID used:", githubEnv.clientID);
  console.log("GitHub Client Secret used:", githubEnv.clientSecret);
  console.log("GitHub Callback URL used:", githubEnv.callbackURL);
  
  if (!githubEnv.clientID || !githubEnv.clientSecret || !githubEnv.callbackURL) {
    console.error("GitHub OAuth environment variables are not set properly.");
    return;
  }
  
  
  passport.use(
    new GitHubStrategy(
      {
        clientID: githubEnv.clientID,
        clientSecret: githubEnv.clientSecret,
        callbackURL: githubEnv.callbackURL,
        scope: ["user:email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          if (!accessToken) {
            console.error("No access token received from GitHub OAuth");
            return done(new Error("No access token received"), null);
          }
          const email =
            profile.emails?.[0]?.value || `${profile.username}@github.com`;

          let user = await User.findOne({ email });

          if (!user) {
            user = await User.create({
              email,
              name: profile.displayName || profile.username,
              provider: "github",
              githubId: profile.id,
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

module.exports = setupGitHubStrategy;
