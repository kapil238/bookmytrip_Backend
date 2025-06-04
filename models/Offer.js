const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  discount: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  bgImage: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Offer', offerSchema);
