const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const { authenticate, adminOnly } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multerConfig');

router.post('/add', authenticate, adminOnly, upload.single('image'), carController.addCar);
router.put('/update/:id',authenticate, adminOnly, carController.updateCar);
router.delete('/delete/:id',authenticate, adminOnly, carController.deleteCar);
router.get('/all', carController.getAllCars);
router.get('/:id', carController.getCarById);

module.exports = router;
