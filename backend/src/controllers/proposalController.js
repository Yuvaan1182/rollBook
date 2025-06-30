const Proposal = require('../models/Proposal');

// Get all proposals
exports.getAllProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find();
    res.json(proposals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get proposal by ID
exports.getProposalById = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) return res.status(404).json({ error: 'Proposal not found' });
    res.json(proposal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new proposal
exports.createProposal = async (req, res) => {
  try {
    const proposal = new Proposal(req.body);
    await proposal.save();
    res.status(201).json(proposal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update proposal
exports.updateProposal = async (req, res) => {
  try {
    const proposal = await Proposal.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!proposal) return res.status(404).json({ error: 'Proposal not found' });
    res.json(proposal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete proposal
exports.deleteProposal = async (req, res) => {
  try {
    const proposal = await Proposal.findByIdAndDelete(req.params.id);
    if (!proposal) return res.status(404).json({ error: 'Proposal not found' });
    res.json({ message: 'Proposal deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
