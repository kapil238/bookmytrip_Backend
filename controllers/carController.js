const Car = require("../models/Car");

exports.addCar = async (req, res) => {
  try {
    const {
      cartype,
      name,
      fuelType,
      price,
      badgeText,
      offerText,
      unit,
      luggage,
      seats,
    } = req.body;

    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : "";

    const car = new Car({
      cartype,
      name,
      fuelType,
      price,
      badgeText,
      offerText,
      unit,
      luggage,
      seats,
      image: imageUrl,
    });

    await car.save();
    res.status(201).json({ message: "Car added successfully", car });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedCar) return res.status(404).json({ error: "Car not found" });
    res.json({ message: "Car updated successfully", updatedCar });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) return res.status(404).json({ error: "Car not found" });
    res.json({ message: "Car deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });

    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
