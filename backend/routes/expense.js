const express = require("express");
const CreateExpense = require("../models/createExpense"); //import the Schema of Create Expense\
const SaveData=require('../models/saveData');
const router = express.Router();

const UserModel=require('../models/userModel');

const authMiddleware=require('../middleware/expenseMiddleWare');

router.delete("/DELETE_EXPENSE/:id", authMiddleware, (req, res, next) => {
  // console.log(req.params.id);
  CreateExpense.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({
      message: "Deleted Successfully",
      status: true,
    });
  });
});

router.get("/GET_SINGLE_EXPENSE/:id",authMiddleware, (req, res, next) => {
  // console.log(req.params.id);
  CreateExpense.findById(req.params.id)
    .then((result) => {
      res.status(200).json({
        message: "SuccessFully Fetched",
        data: result,
        status: true,
      });
      //   next();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving category");
    });
});

router.patch("/UPDATE_EXPENSE/:id",authMiddleware, (req, res, next) => {
  // console.log(req.body);
  CreateExpense.findByIdAndUpdate({ _id: req.params.id }, req.body).then(
    (result) => {
      // console.log(result);
      res.status(200).json({
        message: "SuccessFully Updated",
        status: true,
      });
    }
  );
});

router.get("/GET_ALL_EXPENSE", authMiddleware,(req, res, next) => {
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

router.post("/CREATE_EXPENSE", authMiddleware, (req, res, next) => {
  // req body how to use so we install body-parser
  const newExpense = new CreateExpense({
    name: req.body.name,
    amount: req.body.amount,
    expense_date: req.body.expense_date,
    expense_category: req.body.expense_category,
    payment: req.body.payment,
    comment: req.body.comment,
    creater: req.body.creater,
  });

  UserModel.updateOne({_id:req.body.creater},{
    $push: { expenses: newExpense }
  }).then((result)=>{
    res.status(200).json({
      message:'Expense Added',
      status:true,
    })
  }).catch((err)=>{
    res.status(501).json({
      message:err,
      status:false,
    });
  });
});

router.post('/SAVE_DATA',(req,res,next)=>{
  const allData=new SaveData({
    username:req.body.username,
    name:req.body.name,
    firstLoginDate:req.body.firstLoginDate,
    lastLoginDate:req.body.lastLoginDate,
    userId:req.body.userId,
  });
  allData.save().then((results)=>{
    res.status(200).json({
      message:'Successfully Save',
      data:results,
      status:true,
    });
  }).catch(error=>{
    res.status(500).json({
      message:'Error While Saving Content',
      status:false,
    })
  })
});

router.get('/GET_SAVE_DATA/:id',(req,res,next)=>{
  SaveData.findOne({userId:req.params.id}).then((result)=>{
    res.status(200).json({
      message:'Data Fetched',
      data:result,
      status:true,
    });
  })
  .catch(err=>{
    res.status(500).json({
      message:err.message,
      status:false,
    });
  });
});

module.exports = router;
