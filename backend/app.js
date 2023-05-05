const express = require("express");

const app = express(); //express app, act as a middleware

app.use((req,res,next)=>{
    console.log('This is first middleware bro!!');
    next();
});

app.use((req, res, next) => {
    res.send('This is reponse!!')
    next();
}); // take a func next is important function as this tell the code to execute next block also not end here


module.exports=app;