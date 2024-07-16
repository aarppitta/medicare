const mongoose = require('mongoose');
const { use } = require('../routes/products');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        unique:true,
        required:true
    },
    passwordHash:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:false
    },
    street:{
        type:String,
        default:''
    },
    apartment:{
        type:String,
        default:''
    },
    postcode:{
        type:String,
        default:''
    },
    city:{
        type:String,
        default:''
    },
    
});

// userSchema.virtual('_id').get(function(){
//     return this._id.toHexString();
// });

 userSchema.set('toJSON',{
     virtuals:true
 });

const User = mongoose.model('user', userSchema);
module.exports = User;