const express = require("express");
const CreateExpense = require("../models/createExpense"); //import the Schema of Create Expense\
const router = express.Router();

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
  });
  newExpense.save().then((result) => {
    res.status(201).json({
      message: "Successfully Created",
      status: true,
    });
  }); //database command to insert the data see manogoDB
});

module.exports = router;
