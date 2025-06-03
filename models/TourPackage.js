const mongoose = require('mongoose');

const tourPackageSchema = new mongoose.Schema({
  title: String,
  location: String,
  duration: String,
  type: String,
  category: String,
  price: String,
  imgSrc: String,
  highlights: String,
  visit: String,
});

module.exports = mongoose.model('TourPackage', tourPackageSchema);
