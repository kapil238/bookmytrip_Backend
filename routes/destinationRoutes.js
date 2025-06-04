const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');
const { authenticate, adminOnly } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multerConfig');

router.post('/add', authenticate, adminOnly, upload.single('image'), destinationController.addDestination);
router.put('/update/:id', authenticate, adminOnly, upload.single('image'), destinationController.updateDestination);
router.delete('/delete/:id', authenticate, adminOnly, destinationController.deleteDestination);
router.get('/all', destinationController.getAllDestinations);
router.get('/:id', destinationController.getDestinationById);

module.exports = router;
