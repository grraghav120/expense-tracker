const express = require("express");

const app = express(); //express app, act as a middleware

const bodyParser=require('body-parser'); //imnport body-parser

app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,DELETE,PATCH,OPTIONS");
    next();
});

app.use("/v1/api/GET_ALL_EXPENSE", (req, res, next) => {
  const getAllData = [
    {
      id: "1",
      name: "raghav",
      amount: "200",
      expense_date: "23 Apr 2023",
      expense_category: "Transport",
      payment: "card",
      comments: "ho gya",
    },
    {
      id: "2",
      name: "raghav2",
      amount: "400",
      expense_date: "23 Apr 2023",
      expense_category: "Transport",
      payment: "card",
      comments: "ho gya",
    },
  ];
  res.status(200).json({
    message:'SuccessFully Fetched',
    data:getAllData,
    status:'200 OK',
  });
}); // take a func next is important function as this tell the code to execute next block also not end here

app.post('/v1/api/CREATE_EXPENSE',(req,res,next)=>{

  // req body how to use so we install body-parser
  
  const newExpense=req.body;
  console.log('Added',newExpense); //database insert;
  res.status(201).json({
    message:'Successfully Created',
    status:true,
  })
  next();
})

module.exports = app;
