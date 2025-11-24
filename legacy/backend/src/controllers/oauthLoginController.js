const OAuthLogin = require('../models/OAuthLogin');

// Get all OAuth logins
exports.getAllOAuthLogins = async (req, res) => {
  try {
    const logins = await OAuthLogin.find();
    res.json(logins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get OAuth login by ID
exports.getOAuthLoginById = async (req, res) => {
  try {
    const login = await OAuthLogin.findById(req.params.id);
    if (!login) return res.status(404).json({ error: 'OAuth login not found' });
    res.json(login);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new OAuth login
exports.createOAuthLogin = async (req, res) => {
  try {
    const login = new OAuthLogin(req.body);
    await login.save();
    res.status(201).json(login);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update OAuth login
exports.updateOAuthLogin = async (req, res) => {
  try {
    const login = await OAuthLogin.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!login) return res.status(404).json({ error: 'OAuth login not found' });
    res.json(login);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete OAuth login
exports.deleteOAuthLogin = async (req, res) => {
  try {
    const login = await OAuthLogin.findByIdAndDelete(req.params.id);
    if (!login) return res.status(404).json({ error: 'OAuth login not found' });
    res.json({ message: 'OAuth login deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
