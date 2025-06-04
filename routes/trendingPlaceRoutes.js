const express = require('express');
const router = express.Router();
const trendingPlaceController = require('../controllers/trendingPlaceController');
const { authenticate, adminOnly } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multerConfig');

router.post(
  '/add',
  authenticate,
  adminOnly,
  upload.single('image'),
  trendingPlaceController.addTrendingPlace
);

router.put('/update/:id', authenticate, adminOnly, trendingPlaceController.updateTrendingPlace);
router.delete('/delete/:id', authenticate, adminOnly, trendingPlaceController.deleteTrendingPlace);
router.get('/all', trendingPlaceController.getAllTrendingPlaces);
router.get('/:id', trendingPlaceController.getTrendingPlaceById);

module.exports = router;
