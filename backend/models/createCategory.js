const mongoose = require('mongoose');

const createCategory= mongoose.Schema({
    categories:{type:Array},
});

module.exports = mongoose.model('CreateCategory',createCategory);