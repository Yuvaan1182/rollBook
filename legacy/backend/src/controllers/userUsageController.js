const UserUsage = require('../models/UserUsage');

// Get all user usages
exports.getAllUserUsages = async (req, res) => {
  try {
    const usages = await UserUsage.find();
    res.json(usages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user usage by ID
exports.getUserUsageById = async (req, res) => {
  try {
    const usage = await UserUsage.findById(req.params.id);
    if (!usage) return res.status(404).json({ error: 'User usage not found' });
    res.json(usage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new user usage
exports.createUserUsage = async (req, res) => {
  try {
    const usage = new UserUsage(req.body);
    await usage.save();
    res.status(201).json(usage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update user usage
exports.updateUserUsage = async (req, res) => {
  try {
    const usage = await UserUsage.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!usage) return res.status(404).json({ error: 'User usage not found' });
    res.json(usage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete user usage
exports.deleteUserUsage = async (req, res) => {
  try {
    const usage = await UserUsage.findByIdAndDelete(req.params.id);
    if (!usage) return res.status(404).json({ error: 'User usage not found' });
    res.json({ message: 'User usage deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
