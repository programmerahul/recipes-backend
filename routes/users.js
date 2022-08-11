const express = require("express");
const Router = express.Router();
const bcrypt = require("bcrypt");
const auth = require("../middleWare/auth");
const _ = require("lodash");
const User = require("../models/user");
Router.get("/", async (req, res) => {
  res.send(await User.find());
});
Router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});
Router.post("/", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password,
  });
  await user.save();
  const token = user.getToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});
Router.put("/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    _.pick(req.body, ["name", "email", "password"])
  );
  res.send(user);
});
Router.delete("/:id", async (req, res) => {
  res.send(await User.findByIdAndDelete(req.params.id));
});
module.exports = Router;
