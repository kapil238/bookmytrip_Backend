const express = require('express');
const router = express.Router();
const topRouteController = require('../controllers/topRouteFlightController');
const { authenticate, adminOnly } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multerConfig');

router.post('/add', authenticate, adminOnly, upload.single('image'), topRouteController.addTopRoute);
router.get('/all', topRouteController.getAllTopRoutes);
router.delete('/delete/:id', authenticate, adminOnly, topRouteController.deleteTopRoute);
router.get('/:id', topRouteController.getTopRouteById);
router.put('/update/:id', authenticate, adminOnly, topRouteController.updateTopRoute);

module.exports = router;
