require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/connectDB");
const { port, nodeEnv } = require("./config/env");
const { disconnectRedis } = require("./config/redis");

process.on("SIGINT", disconnectRedis);
process.on("SIGTERM", disconnectRedis);

(async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`🚀 Server running in ${nodeEnv} mode on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
    process.exit(1);
  }
})();
