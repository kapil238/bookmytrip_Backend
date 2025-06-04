const Hotel = require("../models/Hotel");

exports.addHotel = async (req, res) => {
  try {
    const {
      name,
      location,
      nights,
      type,
      category,
      price,
      rating,
      amenities,
      nearby,
    } = req.body;

    if (
      !name ||
      !location ||
      !nights ||
      !type ||
      !category ||
      !price ||
      !rating
    ) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided" });
    }

    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : "";

    const hotel = new Hotel({
      name,
      location,
      nights,
      type,
      category,
      price,
      rating,
      amenities,
      nearby,
      image: imageUrl, 
    });

    await hotel.save();
    res.status(201).json({ message: "Hotel added successfully", hotel });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateHotel = async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedHotel)
      return res.status(404).json({ error: "Hotel not found" });
    res.json({ message: "Hotel updated successfully", updatedHotel });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteHotel = async (req, res) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!deletedHotel)
      return res.status(404).json({ error: "Hotel not found" });
    res.json({ message: "Hotel deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
