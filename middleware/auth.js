const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
require("dotenv").config();

async function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided");

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log(decoded);

    req.user = await User.findById(decoded._id);
    next();
  } catch (ex) {
    console.log(ex);
    res.status(400).send("Invalid token.");
  }
}

module.exports = auth;
