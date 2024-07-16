const mongoose = require('mongoose');

const cartItemSchema = mongoose.Schema({
    quantity:{
        type: Number,
        required: true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

const CartItem = mongoose.model('CartItem', cartItemSchema);
module.exports = CartItem;