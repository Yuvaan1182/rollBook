require("dotenv").config({ path: require('path').resolve(__dirname, '../.env') });

const app = require("./app");
const connectDB = require("./config/connectDB.config");
const { port, nodeEnv } = require("./config/env.config");
const redis = require("./config/redis.config");

process.on("SIGINT", redis.disconnect);
process.on("SIGTERM", redis.disconnect);

(async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`🚀 Server running in ${nodeEnv} on route ✅ http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
    process.exit(1);
  }
})();