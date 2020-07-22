var express = require("express");
const mongoose = require("mongoose");
var router = express.Router();
const { User } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");

/* /AUTH */
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email or Password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Email or Password");

  const token = user.generateAuthToken();
  console.log("login success");
  res.json({
    token: token,
    user: user,
  });
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(50).required(),
  };
  return Joi.validate(req, schema);
}

module.exports = router;
