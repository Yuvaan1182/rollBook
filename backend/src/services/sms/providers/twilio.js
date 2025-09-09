const { createHttpClient } = require("../../../lib/clients/httpClient");
const { configs } = require("../../../config/constants/smsProviders");
const { twilio } = require("../../../config/constants/serviceEndPoints");

const sendViaTwilio = async (payload) => {
  const http = createHttpClient(configs.twilio);
  return await http.post(`${twilio.baseUrl}${twilio.sendSms}`, payload, {
    auth: {
      username: process.env.TWILIO_SID,
      password: process.env.TWILIO_AUTH_TOKEN
    }
  });
};

module.exports = sendViaTwilio;
