const EmailLog = require('../models/EmailLog');

// Get all email logs
exports.getAllEmailLogs = async (req, res) => {
  try {
    const logs = await EmailLog.find();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get email log by ID
exports.getEmailLogById = async (req, res) => {
  try {
    const log = await EmailLog.findById(req.params.id);
    if (!log) return res.status(404).json({ error: 'Email log not found' });
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new email log
exports.createEmailLog = async (req, res) => {
  try {
    const log = new EmailLog(req.body);
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update email log
exports.updateEmailLog = async (req, res) => {
  try {
    const log = await EmailLog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!log) return res.status(404).json({ error: 'Email log not found' });
    res.json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete email log
exports.deleteEmailLog = async (req, res) => {
  try {
    const log = await EmailLog.findByIdAndDelete(req.params.id);
    if (!log) return res.status(404).json({ error: 'Email log not found' });
    res.json({ message: 'Email log deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
