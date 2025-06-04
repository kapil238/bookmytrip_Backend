const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');
const { authenticate, adminOnly } = require('../middlewares/authMiddleware');

router.post('/add', authenticate, adminOnly, offerController.addOffer);
router.put('/update/:id', authenticate, adminOnly, offerController.updateOffer);
router.delete('/delete/:id', authenticate, adminOnly, offerController.deleteOffer);
router.get('/all', offerController.getAllOffers);
router.get('/:id', offerController.getOfferById);

module.exports = router;
