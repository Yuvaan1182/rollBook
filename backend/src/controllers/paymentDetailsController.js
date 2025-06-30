const PaymentDetails = require('../models/PaymentDetails');

// Get all payment details
exports.getAllPaymentDetails = async (req, res) => {
  try {
    const details = await PaymentDetails.find();
    res.json(details);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get payment details by ID
exports.getPaymentDetailsById = async (req, res) => {
  try {
    const details = await PaymentDetails.findById(req.params.id);
    if (!details) return res.status(404).json({ error: 'Payment details not found' });
    res.json(details);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new payment details
exports.createPaymentDetails = async (req, res) => {
  try {
    const details = new PaymentDetails(req.body);
    await details.save();
    res.status(201).json(details);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update payment details
exports.updatePaymentDetails = async (req, res) => {
  try {
    const details = await PaymentDetails.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!details) return res.status(404).json({ error: 'Payment details not found' });
    res.json(details);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete payment details
exports.deletePaymentDetails = async (req, res) => {
  try {
    const details = await PaymentDetails.findByIdAndDelete(req.params.id);
    if (!details) return res.status(404).json({ error: 'Payment details not found' });
    res.json({ message: 'Payment details deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
