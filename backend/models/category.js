const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    cname:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
});

const Category = mongoose.model('Category', categorySchema)
module.exports = Category;