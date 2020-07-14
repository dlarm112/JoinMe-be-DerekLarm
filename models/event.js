const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    minLength: 5,
    maxLength: 30,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    maxLength: 280,
    required: false,
  },
  startTime: {
    type: Number,
  },
  endTime: {
    type: Number,
  },
  maxGroupSize: {
    type: Number,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  //   creatorID: {
  //     type: mongoose.Schema.ObjectId,
  //     ref: "User",
  //     required: true,
  //   },
});

module.exports = mongoose.model("Event", schema);
