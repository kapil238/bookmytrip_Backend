const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  airline: String,
  from: String,
  to: String,
  duration: String,
  stops: String,
  departure: String,
  arrival: String,
  price: String,
  image: String,
  offerText: String,
  badgeText: String,
  flightType: String,
  cabinClass: String,
});

module.exports = mongoose.model('Flight', flightSchema);
