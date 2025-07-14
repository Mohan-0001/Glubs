const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, maxlength: 2000 },
    eventType: {
      type: String,
      enum: ["Hackathon", "Workshop", "Seminar", "Talk", "Meetup", "Other"],
      default: "Other",
    },
    date: { type: Date, required: true },
    time: { type: String }, // optional field to show time separately
    venue: { type: String, trim: true },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClubAdmin",
      required: true,
    },

    media: [
      {
        type: {
          type: String,
          enum: ["image", "video"],
          required: true,
        },
        url: { type: String, required: true },
      },
    ],

    registeredUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String, maxlength: 1000 },
        timestamp: { type: Date, default: Date.now },
      },
    ],

    isTeamEvent: { type: Boolean, default: false },
    
    maxTeamSize: { type: Number, default: 1 },

    feedback: { type: String, maxlength: 2000 },

    isActive: { type: Boolean, default: true }, // in case event is archived
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
