const mongoose = require('mongoose');

const tourPackageSchema = new mongoose.Schema({
  title: String,
  location: String,
  duration: String,
  type: String,
  category: String,
  price: String,
  image: String,
  highlights: String,
  visit: String,
});

module.exports = mongoose.model('TourPackage', tourPackageSchema);
