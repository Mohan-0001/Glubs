const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    maxlength: 1000
  },
  logo: {
    type: String,
    default: '' // for club branding
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClubAdmin',
    required: true
  },
  socialLinks: {
    instagram: String,
    linkedin: String,
    website: String
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Club', clubSchema);
