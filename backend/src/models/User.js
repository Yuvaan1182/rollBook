const mongoose = require('mongoose');

const SocialSchema = new mongoose.Schema({
  platform: { type: String, trim: true, enum: ['linkedin', 'github'], required: true },
  url: { type: String, trim: true, maxlength: 200 },
  isPublic: { type: Boolean, default: false },
  addedAt: { type: Date, default: Date.now }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  name: { type: String, trim: true, minlength: 2, maxlength: 100 },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true, match: /.+\@.+\..+/ },
  password: { type: String, minlength: 8, maxlength: 128 }, // hashed
  phone: { type: String, match: /^\+?[0-9]{7,15}$/ },
  isEmailVerified: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: false },
  twoFactorEnabled: { type: Boolean, default: false },
  twoFactorMethod: {
    type: String,
    enum: ['email', 'sms', 'auth_app'],
    default: 'email'
  },
  twoFactorSecret: { type: String, minlength: 16, maxlength: 64 }, // Only for TOTP (authenticator apps)
  socials: [SocialSchema],
  timezone: { type: String, trim: true, maxlength: 50 },
  locale: { type: String, trim: true, maxlength: 10 },
  industry: { type: String, trim: true, maxlength: 100 },
  services: [{ type: String, trim: true, maxlength: 100 }],
  hasLinkedPaymentDetails: { type: Boolean, default: false },
  calendarIntegration: { type: Boolean, default: false },
  role: {
    type: String,
    enum: ['freelancer', 'admin'],
    default: 'freelancer'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
