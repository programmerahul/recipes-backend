const express = require("express");
const Customer = require("../models/customer");

const router = express.Router();
router.get("/", async (req, res) => {
  res.send(await Customer.find());
});

router.get("/:_id", async (req, res) => {
  res.send(await Customer.findById(req.params._id));
});

router.post("/", async (req, res) => {
  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  customer = await customer.save();
  res.send(customer);
});

router.put("/:_id", async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(
    req.params._id,
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone,
    },
    {
      new: true,
    }
  );
  res.send(customer);
});
router.delete("/:_id", async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params._id);
  res.send(customer);
});
module.exports = router;
