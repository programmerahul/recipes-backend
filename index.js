const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
require("./startups/validate")();
require("./startups/routes")(app);
require("./startups/database")();
require("./startups/config")();
require("./startups/prod")(app);

const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
