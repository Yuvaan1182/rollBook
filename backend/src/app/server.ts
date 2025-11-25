const dotenv = require("dotenv");
dotenv.config();

const { createApp } = require("./app");
const { connectDB } = require("../core/db/mongo");

export default async function startServer() {
  await connectDB(); // connecting to mongoDB
  const app = createApp();
  const PORT = process.env.PORT || 5432;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}
