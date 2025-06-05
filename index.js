const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const flightRoutes = require('./routes/flightRoutes');
const hotelRouters = require('./routes/hotelRoutes');
const tourPackageRoutes = require('./routes/tourPackageRoutes');
const topFlightRoutes = require('./routes/topFlightRoutes');
const offerRoutes = require('./routes/offerRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const trendingPlaceRoutes = require('./routes/trendingPlaceRoutes');
const faqRoutes = require('./routes/faqRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/car', carRoutes);
app.use('/api/bookmytrip/flight', flightRoutes);
app.use('/api/bookmytrip/hotel', hotelRouters);
app.use('/api/bookmytrip/tourpackage', tourPackageRoutes);
app.use('/api/bookmytrip/topflight', topFlightRoutes);
app.use('/api/bookmytrip/offer', offerRoutes);
app.use('/api/bookmytrip/destinations', destinationRoutes);
app.use('/api/bookmytrip/trendingplaces', trendingPlaceRoutes);
app.use('/api/bookmytrip/faq', faqRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
