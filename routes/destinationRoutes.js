const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');
const { authenticate, adminOnly } = require('../middlewares/authMiddleware');

router.post('/add', authenticate, adminOnly, destinationController.addDestination);
router.put('/update/:id', authenticate, adminOnly, destinationController.updateDestination);
router.delete('/delete/:id', authenticate, adminOnly, destinationController.deleteDestination);
router.get('/all', destinationController.getAllDestinations);
router.get('/:id', destinationController.getDestinationById);

module.exports = router;