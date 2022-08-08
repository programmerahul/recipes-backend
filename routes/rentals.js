const express = require("express");
const { Rental, validate } = require("../models/rental");
const Customer = require("../models/customer");
const Movie = require("../models/moive");
const Fawn = require("fawn");
const mongoose = require("mongoose");
const router = express.Router();
Fawn.init("mongodb://localhost/vidly");
router.get("/", async (req, res) => {
  res.send(await Rental.find().sort("-dateOut"));
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }
  const customer = await Customer.findById(req.body.customerId);
  const movie = await Movie.findById(req.body.movieId);
  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock");
  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  Fawn.Task()
    .save("rentals", rental)
    .update(
      "movies",
      { _id: movie._id },
      {
        $inc: {
          numberInStock: -1,
        },
      }
    )
    .run();
  res.send(rental);
});

module.exports = router;
