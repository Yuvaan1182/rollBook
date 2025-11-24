const mongoose = require("mongoose");

const bracketSchema = new mongoose.Schema({
  upTo: { type: Number, required: true },   // income limit
  rate: { type: Number, required: true },   // e.g., 0.2 = 20%
});

const taxBracketSchema = new mongoose.Schema({
  countryCode: { type: String, required: true, unique: true }, // e.g., "IN"
  countryName: { type: String, required: true },               // e.g., "India"
  brackets: [bracketSchema],
}, { timestamps: true });

module.exports = mongoose.model("TaxBracket", taxBracketSchema);
