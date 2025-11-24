const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, trim: true, minlength: 2, maxlength: 100 },
  email: { type: String, trim: true, lowercase: true, match: /.+\@.+\..+/ },
  phone: { type: String, match: /^[0-9]{7,15}$/ }, // Only digits, 7 to 15 characters long
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
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Client", ClientSchema);
