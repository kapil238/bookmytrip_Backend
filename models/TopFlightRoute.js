const mongoose = require('mongoose');

const topFlightRouteSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  code: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model('TopFlightRoute', topFlightRouteSchema);
