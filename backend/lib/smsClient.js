const { createHttpClient } = require("./httpClient");
const { configs } = require("../src/config/constants/smsProviders");
const { twilio, msg91 } = require("../config/serviceEndpoints");

const sendViaTwilio = async (payload) => {
  const http = createHttpClient(configs.twilio);
  return await http.post(`${twilio.baseUrl}${twilio.sendSms}`, payload, {
    auth: {
      username: process.env.TWILIO_SID,
      password: process.env.TWILIO_AUTH_TOKEN
    }
  });
};

const sendViaMsg91 = async (payload) => {
  const http = createHttpClient(configs.msg91);
  return await http.post(`${msg91.baseUrl}${msg91.sendSms}`, payload, {
    headers: { "authkey": process.env.MSG91_API_KEY }
  });
};

module.exports = {
  twilio: sendViaTwilio,
  msg91: sendViaMsg91
};
