const Offer = require('../models/Offer');

exports.addOffer = async (req, res) => {
  try {
    const { title, discount, description, code } = req.body;

    if (!title || !discount || !description || !code) {
      return res.status(400).json({ error: 'All fields except image are required' });
    }

    const existingOffer = await Offer.findOne({ code });
    if (existingOffer) {
      return res.status(400).json({ error: 'Offer with this code already exists' });
    }

    const imageUrl = req.file
      ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
      : '';

    const offer = new Offer({
      title,
      discount,
      description,
      code,
      bgImage: imageUrl,
    });

    await offer.save();
    res.status(201).json({ message: 'Offer added successfully', offer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateOffer = async (req, res) => {
  try {
    const updatedOffer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOffer) return res.status(404).json({ error: 'Offer not found' });
    res.json({ message: 'Offer updated successfully', updatedOffer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteOffer = async (req, res) => {
  try {
    const deletedOffer = await Offer.findByIdAndDelete(req.params.id);
    if (!deletedOffer) return res.status(404).json({ error: 'Offer not found' });
    res.json({ message: 'Offer deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.json(offers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ error: 'Offer not found' });
    res.json(offer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
