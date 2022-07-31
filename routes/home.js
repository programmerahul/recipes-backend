const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.render("index", {
    title: "Movie Genres",
    message: "To see genres, head over to /api/genres",
  });
});
module.exports = router;
