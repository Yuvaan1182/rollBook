const {
  twilioBaseUrl,
  resendBaseUrl,
  stripeBaseUrl,
  msg91BaseUrl
} = require("./env");

module.exports = {
  twilio: {
    baseUrl: twilioBaseUrl,
    sendSms: "/Messages.json"
  },
  stripe: {
    baseUrl: stripeBaseUrl,
    customers: "/v1/customers"
  },
  resend: {
    baseUrl: resendBaseUrl,
    sendEmail: "/emails"
  },
  msg91: {
    baseUrl: msg91BaseUrl,
    sendOtp: "/api/v5/otp"
  }
};
