const mongoose = require('mongoose');

const clubAdminSchema = new mongoose.Schema({
  auth: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auth',
    required: true,
    unique: true // one login per club admin
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  universityRollNo: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  position: {
    type: String,
    default: 'Member', // e.g. President, Coordinator, etc.
    trim: true
  },
  year: {
    type: String,
    enum: ['1st', '2nd', '3rd', '4th', 'Other']
  },
  department: {
    type: String,
    trim: true
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('ClubAdmin', clubAdminSchema);
