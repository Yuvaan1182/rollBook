const emailProviders = require("./emailProviders");

module.exports = {
  otp: require("./otp"),
  enums: require("./enums"),
  roles: require("./roles"),
  messages: require("./messages"),
  emailProviders: require("./emailProviders"),
  serviceEndpoints: require("./serviceEndpoints"),
  payments: require("./payments"),
  smsProviders: require("./smsProviders"),
};
