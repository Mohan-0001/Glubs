const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  auth: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auth',
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  age: {
    type: Number,
    min: 16,
    max: 100
  },
  yearOfStudy: {
    type: String,
    enum: ['1st', '2nd', '3rd', '4th', 'Other']
  },
  department: {
    type: String,
    trim: true
  },
  isClubMember: {
    type: Boolean,
    default: false
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    default: null
  },
  profileImage: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    maxlength: 200
  },
  college: {
    type: String,
    default : "GLA University"
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
