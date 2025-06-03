const express = require('express');
const router = express.Router();
const tourPackageController = require('../controllers/tourPackageController');
const { authenticate, adminOnly } = require('../middlewares/authMiddleware');

router.post('/add', authenticate, adminOnly, tourPackageController.addTourPackage);
router.put('/update/:id', authenticate, adminOnly, tourPackageController.updateTourPackage);
router.delete('/delete/:id', authenticate, adminOnly, tourPackageController.deleteTourPackage);
router.get('/all', tourPackageController.getAllTourPackages);
router.get('/:id', tourPackageController.getTourPackageById);

module.exports = router;
