const { Client } = require("pg");

const connectPostgres = async (uri) => {
  const client = new Client({ connectionString: uri });
  try {
    await client.connect();
    console.log("✅ PostgreSQL connected");
  } catch (err) {
    throw new Error("❌ PostgreSQL connection failed: " + err.message);
  }
};

module.exports = connectPostgres;
