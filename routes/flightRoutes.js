const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');
const { authenticate, adminOnly } = require('../middlewares/authMiddleware');

router.post('/add', authenticate, adminOnly, flightController.addFlight);
router.put('/update/:id', authenticate, adminOnly, flightController.updateFlight);
router.delete('/delete/:id', authenticate, adminOnly, flightController.deleteFlight);
router.get('/all', flightController.getAllFlights);
router.get('/:id', flightController.getFlightById);

module.exports = router;
