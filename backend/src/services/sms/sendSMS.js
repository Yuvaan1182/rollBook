const { smsProvider } = require("../../config/env");
const sendWithTwilio = require("./providers/twilio");
// const sendWithMsg91 = require("./providers/msg91");

module.exports = async function sendSms({ to, body }) {
  if (smsProvider === "twilio") {
    return sendWithTwilio({ to, body });
  }
  // else if (smsProvider === "msg91") {
  //   return sendWithMsg91({ to, body });
  // }

  throw new Error(`Unsupported SMS provider: ${smsProvider}`);
};
