module.exports = {
  gateways: ["stripe", "razorpay"],

  configs: {
    stripe: {
      currency: "usd",
      timeout: 6000,
      retries: 2,
      backoff: 1000
    },
    razorpay: {
      currency: "inr",
      timeout: 4000,
      retries: 1,
      backoff: 1500
    }
  },

  supportedTypes: ["card", "upi", "link"] // for future use
};
