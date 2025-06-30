const twilio = require("twilio");
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports = async function sendWithTwilio({ to, body }) {
  return await client.messages.create({
    body,
    from: process.env.TWILIO_PHONE,
    to
  });
};
