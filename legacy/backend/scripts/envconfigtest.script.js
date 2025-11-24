
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/../.env' });

console.log("Running environment configuration test...");
console.log("Environment Variables:", process.env.REACT_FRONTEND_URL);
const env = require('../src/config/env.config'); // adjust path as needed
console.log("Loaded Environment Config:", env.react.url || "http://localhost:3000");

