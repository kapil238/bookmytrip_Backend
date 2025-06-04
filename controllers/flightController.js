const Flight = require("../models/Flight");

exports.addFlight = async (req, res) => {
  try {
    const {
      airline,
      from,
      to,
      duration,
      stops,
      departure,
      arrival,
      price,
      offerText,
      badgeText,
      flightType,
      cabinClass,
    } = req.body;

    if (
      !airline ||
      !from ||
      !to ||
      !duration ||
      !departure ||
      !arrival ||
      !price
    ) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided" });
    }

    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : "";

    const flight = new Flight({
      airline,
      from,
      to,
      duration,
      stops,
      departure,
      arrival,
      price,
      image: imageUrl,
      offerText,
      badgeText,
      flightType,
      cabinClass,
    });

    await flight.save();
    res.status(201).json({ message: "Flight added successfully", flight });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateFlight = async (req, res) => {
  try {
    const updatedFlight = await Flight.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedFlight)
      return res.status(404).json({ error: "Flight not found" });
    res.json({ message: "Flight updated successfully", updatedFlight });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFlight = async (req, res) => {
  try {
    const deletedFlight = await Flight.findByIdAndDelete(req.params.id);
    if (!deletedFlight)
      return res.status(404).json({ error: "Flight not found" });
    res.json({ message: "Flight deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ message: "Flight not found" });

    res.json(flight);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
