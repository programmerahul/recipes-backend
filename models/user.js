const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});
userSchema.methods.getToken = function () {
  return jwt.sign(
    { _id: this._id, name: this.name },
    config.get("jwtPrivateKey")
  );
};
const User = mongoose.model("Users", userSchema);
module.exports = User;
