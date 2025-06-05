const express = require("express");
const router = express.Router();
const faqController = require("../controllers/faqController");
const { authenticate, adminOnly } = require("../middlewares/authMiddleware");

router.post("/add", authenticate, adminOnly, faqController.addFaq);
router.put("/update/:id", authenticate, adminOnly, faqController.updateFaq);
router.delete("/delete/:id", authenticate, adminOnly, faqController.deleteFaq);
router.get("/all", faqController.getAllFaqs);

module.exports = router;
