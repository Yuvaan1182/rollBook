const { db } = require("./env");

const connectMongoDB = require("./connectors/mongo");
// const connectPostgres = require("./connectors/postgres");

const connectDB = async () => {
  if (db.type === "mongo") {
    return await connectMongoDB(db.mongoURI);
  } else if (db.type === "postgres") {
    // return await connectPostgres(db.postgresURI);
  } else {
    throw new Error(`Unsupported DB type: ${db.type}`);
  }
};

module.exports = connectDB;
