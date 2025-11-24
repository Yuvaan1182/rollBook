const ServiceCatalog = require('../models/ServiceCatalog');

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await ServiceCatalog.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await ServiceCatalog.findById(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new service
exports.createService = async (req, res) => {
  try {
    const service = new ServiceCatalog(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update service
exports.updateService = async (req, res) => {
  try {
    const service = await ServiceCatalog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete service
exports.deleteService = async (req, res) => {
  try {
    const service = await ServiceCatalog.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
