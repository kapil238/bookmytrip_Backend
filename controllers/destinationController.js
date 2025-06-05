const Destination = require("../models/Destination");

exports.addDestination = async (req, res) => {
  try {
    const { name, location, price } = req.body;

    if (!name || !location || !price) {
      return res
        .status(400)
        .json({ error: "Name, location, and price are required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const existingDestination = await Destination.findOne({ name });
    if (existingDestination) {
      return res.status(400).json({ error: "Destination already exists" });
    }
    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : "";

    const destination = new Destination({
      name,
      location,
      price,
      image: imageUrl,
    });

    await destination.save();

    res
      .status(201)
      .json({ message: "Destination added successfully", destination });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDestination = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: "Destination ID is required" });
    }

    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }

    const updated = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ error: "Destination not found" });
    res.json({ message: "Destination updated successfully", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDestination = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: "Destination ID is required" });
    }

    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }

    const deleted = await Destination.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Destination not found" });
    res.json({ message: "Destination deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDestinationById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: "Destination ID is required" });
    }

    const destinationID = await Destination.findById(req.params.id);
    if (!destinationID) {
      return res.status(404).json({ error: "Destination not found" });
    }

    const destination = await Destination.findById(req.params.id);
    if (!destination)
      return res.status(404).json({ message: "Destination not found" });
    res.json(destination);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
