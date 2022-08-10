const express = require("express");
const Router = express.Router();

const bcrypt = require("bcrypt");
const _ = require("lodash");
const User = require("../models/user");
Router.post("/", async (req, res) => {
  req.body.email;
  req.body.password;
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid username or password");
  const validUser = await bcrypt.compare(req.body.password, user.password);
  if (!validUser) return res.status(400).send("Invalid username or password");
  const token = user.getToken();
  res.send(token);
});

module.exports = Router;
