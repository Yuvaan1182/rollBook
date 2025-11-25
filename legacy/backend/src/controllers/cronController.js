const Cron = require('../models/Cron');

// Get all crons
exports.getAllCrons = async (req, res) => {
  try {
    const crons = await Cron.find();
    res.json(crons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get cron by ID
exports.getCronById = async (req, res) => {
  try {
    const cron = await Cron.findById(req.params.id);
    if (!cron) return res.status(404).json({ error: 'Cron not found' });
    res.json(cron);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new cron
exports.createCron = async (req, res) => {
  try {
    const cron = new Cron(req.body);
    await cron.save();
    res.status(201).json(cron);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update cron
exports.updateCron = async (req, res) => {
  try {
    const cron = await Cron.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!cron) return res.status(404).json({ error: 'Cron not found' });
    res.json(cron);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete cron
exports.deleteCron = async (req, res) => {
  try {
    const cron = await Cron.findByIdAndDelete(req.params.id);
    if (!cron) return res.status(404).json({ error: 'Cron not found' });
    res.json({ message: 'Cron deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
