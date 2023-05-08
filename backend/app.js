const express = require("express");

const app = express(); //express app, act as a middleware

const bodyParser = require("body-parser"); //imnport body-parser

const CreateExpense = require("./models/createExpense"); //import the Schema of Create Expense\
const CreateCategory = require('./models/createCategory');

const userRoutes=require('./routes/user');

const mongoose = require("mongoose");



app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,DELETE,PATCH,OPTIONS"
  );
  next();
});

app.delete('/v1/api/DELETE_EXPENSE/:id',(req,res,next)=>{
  // console.log(req.params.id);
  CreateExpense.deleteOne({_id:req.params.id}).then((res)=>{
    next();
  })
});

app.get('/v1/api/GET_SINGLE_EXPENSE/:id', (req, res, next) => {
  // console.log(req.params.id);
  CreateExpense.findById(req.params.id).then(result => {
    res.status(200).json({
      message:"SuccessFully Fetched",
      data:result,
      status:true,
    });
    next();
  }).catch(err => {
    console.error(err);
    res.status(500).send('Error retrieving category');
  });
});

app.patch('/v1/api/UPDATE_EXPENSE/:id',(req,res,next)=>{
  // console.log(req.body);
  CreateExpense.findByIdAndUpdate({_id:req.params.id},req.body).then((result)=>{
    // console.log(result);
    res.status(200).json({
      message: "SuccessFully Updated",
      status: true,
    });
    next();
  });
});

app.use("/v1/api/GET_ALL_EXPENSE", (req, res, next) => {
  CreateExpense.find().then((documents) => {
    // console.log(documents);
    res.status(200).json({
      message: "SuccessFully Fetched",
      data: documents,
      status: true,
    });
    next();
  });
  // next();
}); // take a func next is important function as this tell the code to execute next block also not end here

app.post("/v1/api/CREATE_EXPENSE", (req, res, next) => {
  // req body how to use so we install body-parser

  const newExpense = new CreateExpense({
    name: req.body.name,
    amount: req.body.amount,
    expense_date: req.body.expense_date,
    expense_category: req.body.expense_category,
    payment: req.body.payment,
    comment: req.body.comment,
  });
  newExpense.save().then((result)=>{
    res.status(201).json({
      message: "Successfully Created",
      status: true,
    });
    next();
  }) //database command to insert the data see manogoDB
});

app.post('/v1/api/CREATE_CATEGORY',(req,res,next)=>{
  const allCategory=new CreateCategory({
    categories:req.body.categories,
  })
  allCategory.save().then((res)=>{
    res.status(201).json({
      message:"Successfully Added",
      status:"200",
    })
    next();
  })
  // console.log(req.body.categories);
  
});

app.get('/v1/api/GET_ALL_CATEGORY',(req,res,next)=>{

  CreateCategory.find().then((documents) => {
    console.log(documents);
    res.status(200).json({
      message: "SuccessFully Fetched",
      data: documents,
      status: "200 OK",
    });
    next();
  });
});

app.use('/v1/api/USER',userRoutes);

module.exports = app;
