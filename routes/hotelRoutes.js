const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const { authenticate, adminOnly } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multerConfig');

router.post('/add', authenticate, adminOnly, upload.single('image'), hotelController.addHotel);
router.put('/update/:id', authenticate, adminOnly, hotelController.updateHotel);
router.delete('/delete/:id', authenticate, adminOnly, hotelController.deleteHotel);
router.get('/all', hotelController.getAllHotels);
router.get('/:id', hotelController.getHotelById);

module.exports = router;
