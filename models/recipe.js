const mongoose = require("mongoose");
const recipeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
  },
  author: {
    _id: String,
    name: String,
  },
  description: {
    type: String,
  },
  steps: {
    type: Array,
  },
});
const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
