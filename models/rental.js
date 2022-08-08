const Joi = require("joi");
const mongoose = require("mongoose");
const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: { type: String, required: true, min: 5, max: 255 },
      isGold: { type: Boolean, default: false },
      phone: { type: String, required: true, min: 5, max: 10 },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: { type: String, required: true, trim: true, min: 5, max: 255 },
      dailyRentalRate: { type: Number, required: true, min: 0, max: 255 },
    }),
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});
function validate(ob) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });
  return schema.validate(ob);
}
const Rental = mongoose.model("Rentals", rentalSchema);
module.exports.Rental = Rental;
module.exports.validate = validate;
