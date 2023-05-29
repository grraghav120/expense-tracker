const express = require("express");
const CreateExpense = require("../models/createExpense"); //import the Schema of Create Expense\
const SaveData=require('../models/saveData');
const router = express.Router();

const UserModel=require('../models/userModel');

const authMiddleware=require('../middleware/expenseMiddleWare');

router.delete("/DELETE_EXPENSE/:userId/:id", authMiddleware, (req, res, next) => {
  UserModel.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { expenses: { _id: req.params.id } } },
    { new: true }
    ).then((result) => {
    res.status(200).json({
      message: "Deleted Successfully",
      status: true,
    });
  });
});

router.get("/GET_SINGLE_EXPENSE/:userId/:id",authMiddleware, (req, res, next) => {
  UserModel.findOne({ _id: req.params.userId, 'expenses._id': req.params.id }, { 'expenses.$': 1 }).then((user)=>{
    res.status(200).json({
      message:'Fetch one',
      data:user.expenses[0],
      status:true,
    })
  })
  .catch((err)=>{
    res.status(501).json({
      message:err,
      status:false,
    })
  })
});

router.patch("/UPDATE_EXPENSE/:userId/:id",authMiddleware, (req, res, next) => {
  UserModel.findOneAndUpdate({ _id: req.params.userId, 'expenses._id': req.params.id },
   {$set:{
    'expenses.$':req.body
  }},
   {new:true}
   ).then(
    (result) => {
      // console.log(result);
      res.status(200).json({
        message: "SuccessFully Updated",
        status: true,
      });
    }
  );
});

router.get("/GET_ALL_EXPENSE/:id", authMiddleware,(req, res, next) => {
  UserModel.findOne({_id:req.params.id}).then((documents) => {
    // console.log(documents);
    res.status(200).json({
      message: "SuccessFully Fetched",
      data: documents.expenses,
      status: true,
    });
  }).catch((err)=>{
    res.status(401).json({
      message: err,
      status: false,
    });
  })
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
    expenseLogged:req.body.expenseLogged,
  });
  UserModel.updateOne({_id:req.body.userId},{
    $push: { userData: allData }
  }).then((result)=>{
    res.status(200).json({
      message:'Save',
      status:true,
    })
  }).catch((err)=>{
    res.status(501).json({
      message:err,
      status:false,
    });
  });
});

router.get('/GET_SAVE_DATA/:id',(req,res,next)=>{
  UserModel.findOne({ _id: req.params.id },).then((user)=>{
    res.status(200).json({
      message:'Fetch one',
      data:user.userData[0],
      status:true,
    })
  })
  .catch((err)=>{
    res.status(501).json({
      message:err,
      status:false,
    })
  })
});

router.get('/GET_CATEGORY/:id',(req,res,next)=>{
  UserModel.findOne({ _id: req.params.id },).then((user)=>{
    res.status(200).json({
      message:'Fetch All Category',
      data:user.category,
      status:true,
    })
  })
  .catch((err)=>{
    res.status(501).json({
      message:err,
      status:false,
    })
  })
});

router.post('/SAVE_CATEGORY/:id',(req,res,next)=>{
  UserModel.updateOne({_id:req.params.id},{
    $push: { category: { $each: req.body } }
  }).then((result)=>{
    // console.log(result);
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
})

router.post('/UPDATE_SAVE_DATA/:id',(req,res,next)=>{
  UserModel.findOneAndUpdate({ _id: req.params.id,'userData.userId': req.params.id },
   {$set:{
    'userData.$.lastLoginDate':req.body.lastLoginDate,
    'userData.$.expenseLogged':req.body.expenseLogged,
  }},
   {new:true}
   ).then(
    (result) => {
      res.status(200).json({
        message: "SuccessFully Updated LoginDate",
        status: true,
      });
    }
  );
})

router.post('/UPDATE_PROFILE/:id',(req,res,next)=>{
  UserModel.findOneAndUpdate({ _id: req.params.id,'userData.userId': req.params.id },
   {$set:{
    'userData.$.username':req.body.username,
    'userData.$.name':req.body.name,
  }},
   {new:true}
   ).then(
    (result) => {
      res.status(200).json({
        message: "SuccessFully Updated Profile Info",
        status: true,
      });
    }
  );
})

router.post('/UPDATE_NAME/:id',(req,res,next)=>{
  UserModel.findOneAndUpdate({_id:req.params.id},
  { name: req.body.name ,username:req.body.username}
  ).then(
    (result) => {
      res.status(200).json({
        message: "SuccessFully Updated Info",
        status: true,
      });
    }
  );
})



module.exports = router;
