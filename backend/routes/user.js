const express = require("express");

const UserModel =require('../models/userModel')
const router=express.Router();
const bcrypt=require('bcrypt');

router.post('/SIGN_UP',(req,res,next)=>{
    // console.log(req.body);
    bcrypt.hash(req.body.password,10).then((hash)=>{
        const User=new UserModel({
            name:req.body.name,
            username:req.body.username,
            gmail:req.body.gmail,
            password:hash, //the password should be encrypted so that no one can access the user account not even us(Admin)
        });
        User.save().then((res)=>{
            res.status(201).json({
                message:"Account Created",
                status:true,
            });
            // next();
        }).catch(err=>{
            res.status(500).json({
                error:err,
            });
        });
    })
})


module.exports= router;