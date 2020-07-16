const mongoose = require("mongoose");
const Joi = require('joi')

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      minLength: 5,
      maxLength: 30,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      minLength: 5,
      maxLength: 50,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: 5,
      maxLength: 1024,
      required: true,
    },
  })
);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(30).required(),
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(5).max(50).required()
    };
    return Joi.validate(user, schema)
}

exports.User = User;
exports.validate = validateUser;
