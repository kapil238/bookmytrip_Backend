const TrendingPlaces = require("../models/TrendingPlaces");

exports.addTrendingPlace = async (req, res) => {
  try {
    const { name, location, originalPrice, price, rating, dateRange, type } =
      req.body;

    if (
      !req.body.name ||
      !req.body.location ||
      !req.body.originalPrice ||
      !req.body.price ||
      !req.body.rating ||
      !req.body.dateRange
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const existingPlace = await TrendingPlaces.findOne({ name });
    if (existingPlace) {
      return res.status(400).json({ error: "Trending place already exists" });
    }

    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : "";

    const trendingPlace = new TrendingPlaces({
      name,
      location,
      originalPrice,
      price,
      rating,
      dateRange,
      type,
      image: imageUrl,
    });

    await trendingPlace.save();
    res
      .status(201)
      .json({ message: "Trending place added successfully", trendingPlace });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTrendingPlace = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: "Trending place ID is required" });
    }

    const trendingPlace = await TrendingPlaces.findById(req.params.id);
    if (!trendingPlace) {
      return res.status(404).json({ error: "Trending place not found" });
    }

    const updated = await TrendingPlaces.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Trending place not found" });
    }
    res.json({ message: "Trending place updated successfully", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTrendingPlace = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: "Trending place ID is required" });
    }

    const trendingPlace = await TrendingPlaces.findById(req.params.id);
    if (!trendingPlace) {
      return res.status(404).json({ error: "Trending place not found" });
    }

    await TrendingPlaces.findByIdAndDelete(req.params.id);
    res.json({ message: "Trending place deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllTrendingPlaces = async (req, res) => {
  try {
    const trendingPlaces = await TrendingPlaces.find();
    res.json(trendingPlaces);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTrendingPlaceById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: "Trending place ID is required" });
    }

    const trendingPlace = await TrendingPlaces.findById(req.params.id);
    if (!trendingPlace) {
      return res.status(404).json({ error: "Trending place not found" });
    }
    res.json(trendingPlace);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
