const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("X-Auth-Token");
  if (!token) return res.status(401).send("Access denied. No tokens provided");
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (err) {
    res.send(400).send("Invalid token");
  }
};
