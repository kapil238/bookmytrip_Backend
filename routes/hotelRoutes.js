const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const { authenticate, adminOnly } = require('../middlewares/authMiddleware');

router.post('/add', authenticate, adminOnly, hotelController.addHotel);
router.put('/update/:id', authenticate, adminOnly, hotelController.updateHotel);
router.delete('/delete/:id', authenticate, adminOnly, hotelController.deleteHotel);
router.get('/all', hotelController.getAllHotels);
router.get('/:id', hotelController.getHotelById);

module.exports = router;
