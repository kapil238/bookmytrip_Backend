const TourPackage = require('../models/TourPackage');

exports.addTourPackage = async (req, res) => {
  try {
    const tourPackage = new TourPackage(req.body);
    await tourPackage.save();
    res.status(201).json({ message: 'Tour Package added successfully', tourPackage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTourPackage = async (req, res) => {
  try {
    const updatedTour = await TourPackage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTour) return res.status(404).json({ error: 'Tour Package not found' });
    res.json({ message: 'Tour Package updated successfully', updatedTour });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTourPackage = async (req, res) => {
  try {
    const deletedTour = await TourPackage.findByIdAndDelete(req.params.id);
    if (!deletedTour) return res.status(404).json({ error: 'Tour Package not found' });
    res.json({ message: 'Tour Package deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllTourPackages = async (req, res) => {
  try {
    const tours = await TourPackage.find();
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTourPackageById = async (req, res) => {
  try {
    const tour = await TourPackage.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: 'Tour Package not found' });

    res.json(tour);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
