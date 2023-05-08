const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const userSchmema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  gmail: { type: String, required: true, unique: true }, //not works as a validator so we import mongoose-unique-validator
  password: { type: String, required: true },
});

userSchmema.plugin(uniqueValidator);

module.exports = mongoose.model("UserSchema", userSchmema);
