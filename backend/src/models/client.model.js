const mongoose = require("mongoose");
const createBaseSchema = require("./baseSchema");

const ClientSchema = createBaseSchema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, trim: true, minlength: 2, maxlength: 100 },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: /.+\@.+\..+/,
    unique: true,
  },
  phone: { type: String, match: /^[0-9]{7,15}$/, unique: true }, // Only digits, 7 to 15 characters long
  country: { type: String, trim: true, maxlength: 100 },
  countryCode: { type: String, trim: true, maxlength: 10 },
  company: { type: String, trim: true, maxlength: 100 },
  address: { type: String, trim: true, maxlength: 200 },
  preferredCurrency: { type: String, trim: true, maxlength: 10 },
  timezone: { type: String, trim: true, maxlength: 50 },
  notes: { type: String, trim: true, maxlength: 500 },
  tags: [{ type: String, trim: true, maxlength: 50 }],
  status: {
    type: String,
    enum: ["active", "lead", "inactive", "defaulter"],
    default: "active",
  },
});

module.exports = mongoose.model("Client", ClientSchema);
