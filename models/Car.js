const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  cartype: String,
  name: String,
  fuelType: String,
  price: String,
  badgeText: String,
  offerText: String,
  unit: String,
  luggage: String,
  seats: String,
  image: String,
});

module.exports = mongoose.model('Car', carSchema);
