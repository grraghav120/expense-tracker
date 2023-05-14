const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const SaveData=mongoose.Schema({
  username:({type:String}),
  name:({type:String}),
  firstLoginDate:({type:String}),
  lastLoginDate:({type:String}),
  expenseLogged:({type:String}),
  userId:({type:String}),
});


const createExpense = mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  expense_date: { type: String, required: true },
  expense_category: { type: String, required: true },
  payment: { type: String, required: true },
  comment: { type: String, required: false },
  creater:{type:mongoose.Schema.Types.ObjectId,ref:"UserSchema",required:true},
});


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
