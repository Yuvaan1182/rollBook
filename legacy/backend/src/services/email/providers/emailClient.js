const sendViaAmazonSES = require("./amazonSES");
const sendViaResend = require("./resend");
const sendViaSendgrid = require("./sendgrid");

module.exports = {
  resend: sendViaResend,
  sendgrid: sendViaSendgrid,
  amazonses: sendViaAmazonSES
};
