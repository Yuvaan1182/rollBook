const { createClient } = require("redis");
const { redis: redisConfig } = require("./env.config");

class RedisService {
  constructor() {
    this.client = null;

    if (!redisConfig?.url) {
      throw new Error("❌ Redis URL is missing in configuration");
    }

    this.prefix = redisConfig.prefix || "";
  }

  async connect() {
    if (this.client && this.client.isOpen) return this.client;

    this.client = createClient({ url: redisConfig.url });

    this.client.on("error", (err) => {
      console.error("❌ Redis error:", err);
    });

    this.client.on("connect", () => {
      console.log("✅ Redis connected");
    });

    this.client.on("reconnecting", () => {
      console.warn("♻️ Redis reconnecting...");
    });

    await this.client.connect();
    return this.client;
  }

  async disconnect() {
    if (this.client && this.client.isOpen) {
      await this.client.quit();
      console.log("🛑 Redis connection closed");
    }
  }

  isConnected() {
    return this.client?.isOpen;
  }

  getClient() {
    return this.client;
  }

  getKey(key) {
    return `${this.prefix}${key}`;
  }

  // -----------------------
  // 🔧 Basic Redis Helpers
  // -----------------------

  async set(key, value, options = {}) {
    if (value === undefined || value === null) {
      throw new Error(
        `❌ Redis .set() value cannot be undefined or null for key: ${key}`
      );
    }

    try {
      const client = await this.connect();
      const result = await client.set(this.getKey(key), value, options);
      if (result === 'OK') {
        console.log(`✅ Redis set: key '${this.getKey(key)}' set successfully.`);
        return { success: true, message: `Key '${this.getKey(key)}' set successfully in Redis.` };
      } else {
        console.warn(`⚠️ Redis set: key '${this.getKey(key)}' set returned:`, result);
        return { success: false, message: `Redis set returned: ${result}` };
      }
    } catch (err) {
      console.error(`❌ Redis set failed for key: ${key}`, err);
      throw err; // Let caller handle if needed
    }
  }

  async get(key) {
    const client = await this.connect();
    return client.get(this.getKey(key));
  }

  async del(key) {
    const client = await this.connect();
    return client.del(this.getKey(key));
  }

  async incr(key) {
    const client = await this.connect();
    return client.incr(this.getKey(key));
  }

  async expire(key, seconds) {
    const client = await this.connect();
    return client.expire(this.getKey(key), seconds);
  }

  async exists(key) {
    const client = await this.connect();
    return client.exists(this.getKey(key));
  }

  // -----------------------
  // 🧠 JSON Helpers
  // -----------------------

  /**
   * Set a JSON object in Redis
   * @param {string} key - The key to store the JSON object under
   * @param {Object} object - The JSON object to store
   * @param {Object} [options] - Additional options for Redis set command
   * @returns {Promise<string>} - Returns the result of the set operation
   */
  async setJSON(key, object, options = {}) {
    if (object === undefined || object === null) {
      throw new Error(
        `❌ Redis .set() value cannot be undefined or null for key: ${key}`
      );
    }

    return this.set(key, JSON.stringify(object), options);
  }

  async getJSON(key) {
    const value = await this.get(key);
    return value ? JSON.parse(value) : null;
  }
}

const redisService = new RedisService();
module.exports = redisService;
