const express = require("express");
const Router = express.Router();
const auth = require("../middleWare/auth");
const _ = require("lodash");
const Recipe = require("../models/recipe");
Router.get("/:id", auth, async (req, res) => {
  res.send(await Recipe.findById(req.params.id));
});
Router.get("/", auth, async (req, res) => {
  res.send(await Recipe.find());
});
Router.post("/", auth, async (req, res) => {
  const aUser = {};
  aUser._id = req.user._id;
  aUser.name = req.user.name;
  const recipe = new Recipe({
    name: req.body.name,
    ingredients: req.body.ingredients,
    author: aUser,
    description: req.body.description,
    steps: req.body.steps,
  });
  await recipe.save();
  res.send(recipe);
});
Router.put("/:id", auth, async (req, res) => {
  const recipe = await Recipe.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    ingredients: req.body.ingredients,
    author: req.user,
    description: req.body.description,
    steps: req.body.steps,
  });
  res.send(recipe);
});
Router.delete("/:id", async (req, res) => {
  res.send(await Recipe.findByIdAndDelete(req.params.id));
});
module.exports = Router;
