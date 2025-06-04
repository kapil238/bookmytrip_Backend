const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: String,
  location: String,
  nights: String,
  type: String,
  category: String,
  price: String,
  rating: String,
  image: String,
  amenities: String,
  nearby: String,
});

module.exports = mongoose.model('Hotel', hotelSchema);
