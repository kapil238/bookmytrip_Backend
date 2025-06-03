const TopRoute = require('../models/TopFlightRoute');

exports.addTopRoute = async (req, res) => {
  try {
    const route = new TopRoute(req.body);
    await route.save();
    res.status(201).json({ message: 'Top route added successfully', route });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllTopRoutes = async (req, res) => {
  try {
    const routes = await TopRoute.find();
    res.json(routes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTopRouteById = async (req, res) => {
  try {
    const route = await TopRoute.findById(req.params.id);
    if (!route) return res.status(404).json({ error: 'Route not found' });
    res.json(route);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTopRoute = async (req, res) => {
  try {
    const updatedRoute = await TopRoute.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRoute) return res.status(404).json({ error: 'Route not found' });
    res.json({ message: 'Route updated successfully', updatedRoute });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTopRoute = async (req, res) => {
  try {
    const deletedRoute = await TopRoute.findByIdAndDelete(req.params.id);
    if (!deletedRoute) return res.status(404).json({ error: 'Route not found' });
    res.json({ message: 'Route deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
