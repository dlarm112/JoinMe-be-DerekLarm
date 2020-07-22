const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minLength: 5,
    maxLength: 30,
    required: true,
    unique: true,
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
  isCreator: Boolean,
  friends: [],
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isCreator: this.isCreator },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(30).required(),
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(50).required(),
  };
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
