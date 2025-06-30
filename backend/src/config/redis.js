const { createClient } = require("redis");
const { redis: redisConfig } = require("./env");

let client;

const connectRedis = async () => {
  if (client) return client;

  client = createClient({ url: redisConfig.url });

  client.on("error", (err) => {
    console.error("❌ Redis connection error:", err);
  });

  client.on("connect", () => {
    console.log("✅ Redis connected successfully");
  });

  await client.connect();
  return client;
};

const disconnectRedis = async () => {
  if (client && client.isOpen) {
    await client.quit();
    console.log("🛑 Redis connection closed");
  }
};

const isConnected = () => client?.isOpen;
const getClient = () => client;
const getKey = (key) => `${redisConfig.prefix}${key}`;

module.exports = {
  connectRedis,
  disconnectRedis,
  getRedisClient: getClient,
  getKey,
  isConnected,
};
