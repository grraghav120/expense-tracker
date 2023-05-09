const express = require("express");

const UserModel = require("../models/userModel");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // To generate Token

router.post("/SIGN_UP", (req, res, next) => {
//   console.log(req.body);
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const User = new UserModel({
      name: req.body.name,
      username: req.body.username,
      gmail: req.body.gmail,
      password: hash, //the password should be encrypted so that no one can access the user account not even us(Admin)
      userFirstSignUp: req.body.userFirstSignUp,
    });
    User.save().then((result)=>{
        res.status(200).json({
            message: "Account Created",
            status: true,
            data:{UserSince:result.userFirstSignUp,username:result.username,name:result.name}
        });
    }).catch(err=>{
        res.status(500).json({
            message: err,
            status: true,
            // data:result
        });
    })
    
  })
  .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/LOGIN", (req, res, next) => {
  // console.log(req.body);
  UserModel.findOne({ gmail: req.body.gmail })
    .then((user) => {
      if (!user) {
        //app crash now good..
        return res.status(401).json({
          message: "Invalid Email Address",
          status: true,
        });
      }
      //   console.log(user);
      bcrypt
        .compare(req.body.password, user.password)
        .then((validate) => {
          if (!validate) {
            return res.status(401).json({
              message: "Invalid Email Address or Password",
            });
          }
          //Valid Case generate token
          const token = jwt.sign(
            { gmail: user.gmail, userId: user._id },
            "raghav_garg_first_mean_project_this_can_be_anything",
            { expiresIn: 3600 } // 1 hour
          );
          res.status(200).json({
            message: "Login Successfully!",
            data: {
              token: token,
              latestLoginDate: new Date(),
              userId: user._id,
            },
            status: true,
          });
        })
        .catch((err) => {
          return res.status(401).json({
            message: "Invalid Email or Password",
          });
        });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    });
});

module.exports = router;
