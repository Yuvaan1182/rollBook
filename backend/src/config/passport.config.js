// config/passport.config.js
const passport = require("passport");
const setupGoogleStrategy = require("../strategies/google.strategy");
const setupGitHubStrategy = require("../strategies/github.strategy");

setupGoogleStrategy(passport);
setupGitHubStrategy(passport);

module.exports = passport;
