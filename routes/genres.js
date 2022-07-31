const express = require("express");
const { Genre, validateGenre } = require("../models/genre");

const router = express.Router();

router.get("/:_id", async (req, res) => {
  const genre = await Genre.findById(req.params._id);
  if (!genre) {
    res.status(404).send("There are no genre with this _id");
  }
  res.send(genre);
});

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(500).send(error.details[0].message);
  else {
    const genre = new Genre({
      name: req.body.name,
    });
    try {
      const genreFromDb = await genre.save();
      res.send(genreFromDb);
    } catch (ex) {
      res.status(400).send(ex);
    }
  }
});

router.put("/:_id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(500).send(error.details[0].message);
  const genre = await Genre.findById(req.params._id);
  if (!genre) {
    return res.status(404).send("Genre not found");
  }
  genre.name = req.body.name;
  const result = await genre.save();
  res.send(result);
});

router.delete("/:_id", async (req, res) => {
  try {
    const genre = await Genre.findByIdAndDelete(req.params._id);
    if (!genre) res.status(404).send("Genre with given id was not found");
    res.send(genre);
  } catch (ex) {
    res.send(ex).status(500);
  }
});
module.exports = router;
