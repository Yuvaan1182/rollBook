const mongoose = require("mongoose");

const PaymentDetailsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  upiId: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
  bankAccount: {
    accountHolder: { type: String, trim: true, minlength: 2, maxlength: 100 },
    accountNumber: { type: String, minlength: 6, maxlength: 32 }, // encrypted
    ifscCode: {
      type: String,
      uppercase: true,
      match: /^[A-Z]{4}0[A-Z0-9]{6}$/,
    },
    bankName: { type: String, trim: true, minlength: 2, maxlength: 100 },
  },
  cardReceiverLink: { type: String, trim: true, maxlength: 200 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PaymentDetails", PaymentDetailsSchema);
