const mongoose = require('mongoose');

const SaveData=mongoose.Schema({
    username:({type:String}),
    name:({type:String}),
    firstLoginDate:({type:String}),
    lastLoginDate:({type:String}),
    expenseLogged:({type:Number}),
    userId:({type:String}),
});

module.exports=mongoose.model('SaveData',SaveData);