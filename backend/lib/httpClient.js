const axios = require("axios");
const axiosRetry = require("axios-retry");

function createHttpClient({ timeout, retries, backoff }) {
  const client = axios.create({ timeout });

  axiosRetry(client, {
    retries,
    retryDelay: () => backoff,
    retryCondition: (err) =>
      axiosRetry.isNetworkOrIdempotentRequestError(err)
  });

  client.interceptors.request.use((config) => {
    console.log(`📤 [${config.method.toUpperCase()}] ${config.baseURL}${config.url}`);
    return config;
  });

  client.interceptors.response.use(
    (res) => res,
    (err) => {
      console.error(`❌ HTTP Error: ${err.message}`);
      return Promise.reject(err);
    }
  );

  return client;
}

module.exports = { createHttpClient };
