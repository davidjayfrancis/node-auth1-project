const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
  let user = req.body;
  console.log(user);

  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  Users.add(user)
    .then(savedUser => {
      res.status(200).json(savedUser);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
