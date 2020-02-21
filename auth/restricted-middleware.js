const bcrypt = require("bcryptjs");
const Users = require("../users/users-model.js");

module.exports = (req, res, next) => {
  console.log(req.session.user);

  if (req.session.user && req.session) {
    next();
  } else {
    res.status(401).json({ message: "NO COOKIES!" });
  }
};
