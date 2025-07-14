const mongoose = require('mongoose');

const eventStatsSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
    unique: true // one stats doc per event
  },
  views: {
    type: Number,
    default: 0,
    min: 0
  },
  registrations: {
    type: Number,
    default: 0,
    min: 0
  },
  commentsCount: {
    type: Number,
    default: 0,
    min: 0
  },
  scannedCount: {
    type: Number,
    default: 0,
    min: 0
  } // ⬅️ Optional: number of users who actually scanned QR and attended
}, { timestamps: true });

module.exports = mongoose.model('EventStats', eventStatsSchema);
