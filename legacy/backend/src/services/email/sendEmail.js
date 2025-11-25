const { resend } = require("../../constants/serviceConfigs");
const { createHttpClient } = require("../../lib/httpClient");
const { resend: resendEndpoint } = require("../../config/serviceEndPoints");

const httpClient = createHttpClient(resend);

async function sendEmail(payload) {
  const url = `${resendEndpoint.baseUrl}${resendEndpoint.sendEmail}`;
  return await httpClient.post(url, payload, {
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`
    }
  });
}

module.exports = { sendEmail };
