const { providers } = require("../../config/constants/emailProviders");
const clients = require("./providers/emailClient");

/** TODO
 *  Add service priorities in redis
 *  Add service on/off switch in redis
 */

async function sendEmailWithFallback(payload) {
  let lastError;

  for (const provider of providers) {
    try {
      console.log(`📤 Trying ${provider.toUpperCase()}...`);
      const res = await clients[provider](payload);
      console.log(`✅ Sent via ${provider}`);
      return res.data || res;
    } catch (err) {
      console.error(`❌ ${provider} failed:`, err.message);
      lastError = err;
    }
  }

  // All failed
  throw new Error(`All email providers failed. Last error: ${lastError.message}`);
}

module.exports = sendEmailWithFallback;

