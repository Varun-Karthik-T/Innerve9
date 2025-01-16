const mongoose = require('mongoose');
require('dotenv').config();


const dbURL = process.env.MONGODB_URI;

mongoose.connect(dbURL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

module.exports = mongoose.connection;