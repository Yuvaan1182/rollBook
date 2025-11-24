const { createHttpClient } = require("../../../lib/clients/httpClient");
const { configs } = require("../../../config/constants/smsProviders");
const { msg91 } = require("../../../config/constants/serviceEndPoints");

const sendViaMsg91 = async (payload) => {
  const http = createHttpClient(configs.msg91);
  return await http.post(`${msg91.baseUrl}${msg91.sendSms}`, payload, {
    headers: { "authkey": process.env.MSG91_API_KEY }
  });
};

module.exports = sendViaMsg91;
