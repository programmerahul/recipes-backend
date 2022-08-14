const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.render("index", {
    title: "Movies backend",
    message: "/api/genres|customer|movies|rentals|users|auth",
  });
});
module.exports = router;
