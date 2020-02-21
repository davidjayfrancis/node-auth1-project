const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

const authRouter = require("./auth/auth-router.js");
const router = express.Router();
const app = express();

const sessionConfig = {
  name: "hamster",
  secret: "notagerbil",
  cookies: {
    maxAge: 1000 * 60 * 60,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false
};

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(session(sessionConfig));

app.use("/", authRouter);

app.get("/", (req, res) => {
  res.json({ message: "We are in business :)" });
});

module.exports = app;
