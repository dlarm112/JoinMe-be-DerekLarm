const mongoose = require("mongoose");
const { number } = require("joi");

const schema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
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
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  rawDate:{
    type: Number,
  },
  apiDate:{
    type: String,
  },
  creatorID: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Event", schema);
