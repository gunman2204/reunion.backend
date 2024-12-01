const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  temp: {
    type: Number,
    // required: true,
  },
  humidity: {
    type: Number,
    // required: true,
  },
  cityname: {
    type: String,
    // required: true,
  },
  wind: {
    type: Number,
    // required: true,
  },
  condition: {
    type: String,
    // required: true,
  }
});

module.exports = mongoose.model('Location', LocationSchema);
