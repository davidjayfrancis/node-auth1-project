const express = require("express");

const authRouter = require("./auth/auth-router.js");
const router = express.Router();
const app = express();

app.use(express.json());

app.use("/", authRouter);

app.get("/", (req, res) => {
  res.json({ message: "We are in business :)" });
});

module.exports = app;
