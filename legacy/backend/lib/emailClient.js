const { createHttpClient } = require("./httpClient");
const { configs } = require("../src/config/constants/emailProviders");
const { resend, sendgrid } = require("../config/serviceEndpoints");

const sendViaResend = async (payload) => {
  const http = createHttpClient(configs.resend);
  const url = `${resend.baseUrl}${resend.sendEmail}`;

  return await http.post(url, payload, {
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` }
  });
};

const sendViaSendgrid = async (payload) => {
  const http = createHttpClient(configs.sendgrid);
  const url = `${sendgrid.baseUrl}${sendgrid.sendEmail}`;

  return await http.post(url, payload, {
    headers: {
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`
    }
  });
};

module.exports = {
  resend: sendViaResend,
  sendgrid: sendViaSendgrid
};
