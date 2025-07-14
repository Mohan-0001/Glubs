const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  image: {
    type: String,
    default: '' // Optional banner or image URL
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auth',
    required: true
  },
  validTill: {
    type: Date,
    required: false // Optional expiration date
  },
  audience: {
    type: String,
    enum: ['all', 'users', 'club-admins'],
    default: 'all'
  },
  priority: {
    type: String,
    enum: ['normal', 'high'],
    default: 'normal'
  }
}, { timestamps: true });

module.exports = mongoose.model('Announcement', announcementSchema);
