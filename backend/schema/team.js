const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'declined'],
      default: 'pending'
    },
    invitedAt: {
      type: Date,
      default: Date.now
    },
    respondedAt: Date
  }],
  maxMembers: {
    type: Number,
    required: true
  },
  minMembers: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['forming', 'complete', 'registered'],
    default: 'forming'
  },
  inviteCode: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    maxlength: 500
  }
}, { timestamps: true });

// Generate unique invite code before saving
teamSchema.pre('save', function(next) {
  if (!this.inviteCode) {
    this.inviteCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  next();
});

module.exports = mongoose.model('Team', teamSchema);