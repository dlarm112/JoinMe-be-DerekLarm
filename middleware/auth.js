const jwt = require("jsonwebtoken");
const config = require("config");
const { User } = require("../models/user");

async function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    console.log(decoded);

    req.user = await User.findById(decoded._id);
    next();
  } catch (ex) {
    console.log(ex);
    res.status(400).send("Invalid token.");
  }
}

module.exports = auth;
