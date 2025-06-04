const mongoose = require("mongoose");

const trendingPlacesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  dateRange: { type: String, required: true },
  liked: { type: Boolean, default: false },
  type: { type: String, enum : ['Domestic', 'International'], default:'Domestic', required: true }
});

module.exports = mongoose.model("TrendingPlaces", trendingPlacesSchema);