const router = require("express").Router();
const bcrypt = require("bcryptjs");
const restricted = require("./restricted-middleware.js");

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

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })

    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error accessing the database" });
    });
});

router.get("/users", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Error accessing the database" });
    });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.send("You had an error logging out");
      } else {
        res.send("Goodbye you are logged out");
      }
    });
  } else {
    res.end();
  }
});

module.exports = router;
