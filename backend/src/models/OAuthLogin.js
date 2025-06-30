const mongoose = require('mongoose');

const OAuthLoginSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  provider: { type: String, trim: true, maxlength: 30 },
  providerId: { type: String, trim: true, maxlength: 100 },
  email: { type: String, trim: true, lowercase: true, match: /.+\@.+\..+/ }
});

module.exports = mongoose.model('OAuthLogin', OAuthLoginSchema);
