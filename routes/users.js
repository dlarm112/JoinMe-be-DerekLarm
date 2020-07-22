var express = require("express");
const mongoose = require("mongoose");
var router = express.Router();
const { User, validate } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

/* /USERS */

// GET USER
router.get("/me", auth, async (req, res) => {
  res.json({ user: req.user });
});

// REGISTER NEW USER
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header("Bearer", token).send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
