const { providers } = require("../../config/constants/smsProviders");
const clients = require("./providers/smsClient");

async function sendSmsWithFallback(payload) {
  let lastError;

  for (const provider of providers) {
    try {
      console.log(`📲 Trying ${provider.toUpperCase()}...`);
      const res = await clients[provider](payload);
      console.log(`✅ Sent SMS via ${provider}`);
      return res.data || res;
    } catch (err) {
      console.error(`❌ ${provider} failed:`, err.message);
      lastError = err;
    }
  }

  throw new Error(`All SMS providers failed. Last error: ${lastError.message}`);
}

module.exports = { sendSmsWithFallback };
