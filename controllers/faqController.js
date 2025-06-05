const Faq = require("../models/Faq");

exports.addFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;

    const faq = new Faq({ question, answer });
    await faq.save();

    res.status(201).json({ message: "FAQ added successfully", faq });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateFaq = async (req, res) => {
  try {
    const updatedFaq = await Faq.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedFaq) return res.status(404).json({ error: "FAQ not found" });

    res.json({ message: "FAQ updated successfully", updatedFaq });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFaq = async (req, res) => {
  try {
    const deletedFaq = await Faq.findByIdAndDelete(req.params.id);

    if (!deletedFaq) return res.status(404).json({ error: "FAQ not found" });

    res.json({ message: "FAQ deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ createdAt: -1 });
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
