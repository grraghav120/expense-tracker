const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

// Removed saveData and createExpense schema as they are already created in different files


const userSchmema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  gmail: { type: String, required: true, unique: true }, //not works as a validator so we import mongoose-unique-validator
  password: { type: String, required: true },
  userFirstSignUp:{type:String,required:true},
  userData:[SaveData],
  expenses:[createExpense],
  category:[],
});

userSchmema.plugin(uniqueValidator);

module.exports = mongoose.model("UserSchema", userSchmema);
