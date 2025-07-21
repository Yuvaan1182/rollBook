const sendViaTwilio = require("./twilio");
const sendViaMsg91 = require("./msg91");

module.exports = {
  twilio: sendViaTwilio,
  msg91: sendViaMsg91
};
