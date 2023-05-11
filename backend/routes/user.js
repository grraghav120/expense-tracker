const express = require("express");

const UserModel = require("../models/userModel");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // To generate Token

router.post("/SIGN_UP", (req, res, next) => {
  //   console.log(req.body);
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const User = new UserModel({
        name: req.body.name,
        username: req.body.username,
        gmail: req.body.gmail,
        password: hash, //the password should be encrypted so that no one can access the user account not even us(Admin)
        userFirstSignUp: req.body.userFirstSignUp,
      });
      User.save()
        .then((result) => {
          const token = jwt.sign(
            { gmail: req.gmail },
            "raghav_garg_first_mean_project_this_can_be_anything",
            { expiresIn: '1h' } // 1 hour
          );
          res.status(200).json({
            message: "Account Created",
            status: true,
            data: {
              UserSince: result.userFirstSignUp,
              username: result.username,
              name: result.name,
              token: token,
              expiredToken: 3600,
              userId:result._id,
            },
          });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({
            message: 'Failed to create user',
            error: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

router.post("/LOGIN", (req, res, next) => {
  UserModel.findOne({ gmail: req.body.gmail })
    .then((user) => {
      if (!user) {
        //app crash now good..
        return res.status(401).json({
          message: "Invalid Email Address",
          status: false,
        });
      }
      //   console.log(user);
      bcrypt
        .compare(req.body.password, user.password)
        .then((validate) => {
          if (!validate) {
            return res.status(401).json({
              message: "Invalid Email Address or Password",
              status: false,
            });
          }
          //Valid Case generate token
          const token = jwt.sign(
            { gmail: user.gmail, userId: user._id },
            "raghav_garg_first_mean_project_this_can_be_anything",
            { expiresIn: '1h' } // 1 hour
          );
          res.status(200).json({
            message: "Login Successfully!",
            data: {
              token: token,
              latestLoginDate: new Date(),
              userId: user._id,
              expiredToken:3600,
            },
            status: true,
          });
        })
        .catch((err) => {
          return res.status(401).json({
            message: "Something Went Wrong! Please Try Again",
            status: false,
          });
        });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Something Weird! Please Try Again",
        status: false,
      });
    });
});

module.exports = router;
