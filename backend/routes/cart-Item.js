const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const OrderItem = require('../models/order-item')
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const CartItem = require('../models/cart-item');


// get cart items
router.get('/', async (req, res) => {
    try {
      // Verify the JWT and get the user ID
      const token = req.headers.authorization.split(' ')[1]; // Assuming the JWT is in the Authorization header
      const secret = process.env.secret;
      const decodedToken = jwt.verify(token, secret); // Replace 'YOUR_SECRET_KEY' with your actual secret key
      const userId = decodedToken.userId;
  
      const cartItems = await CartItem.find({ user: userId }).populate('product');
      res.json(cartItems);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  //add to cart
router.post('/', async (req, res) => {
    try {

    // Verify the JWT and get the user ID
    const token = req.headers.authorization.split(' ')[1]; // Assuming the JWT is in the Authorization header
    const secret = process.env.secret;
    const decodedToken = jwt.verify(token, secret); // Replace 'YOUR_SECRET_KEY' with your actual secret key
    const userId = decodedToken.userId;
    console.log(userId);

      // Check if the order item already exists
      let existingCartItem = await CartItem.findOne({ product: req.body.product_id, user: userId });
       

      if (existingCartItem) {
        // If the order item exists, increase the quantity
        existingCartItem.quantity += req.body.quantity;
        await existingCartItem.save();
        res.json(existingCartItem);
      } else {
        // If the order item does not exist, create a new one
        let newCartItem = new CartItem({
          quantity: req.body.quantity || 1,
          product: req.body.product_id,
          user:userId,
        });
  
      const savedCartItem = await newCartItem.save();
      res.json(savedCartItem);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

    //update the cart
router.put('/:id', (req,res) => {
    CartItem.findByIdAndUpdate(req.params.id
        ,req.body,{new:true}).then(cartItem => {
        if(cartItem){
            return res.status(200).json({success:true, message:'cart Item updated'})
        }
        else{
            return res.status(404).json({success:false, message:'cart Item not found'})
        }
    }
    ).catch(err => {
        return res.status(400).json({success:false, error:err})
    })
});

  //delete the cart
router.delete('/:id', (req,res) => {
    CartItem.findByIdAndDelete(req.params.id).then(cartItem => {
        if(cartItem){
            return res.status(200).json({success:true, message:'cart Item deleted'})
        }else{
            return res.status(404).json({success:false, message:'cart Item not found'})
        }
    }).catch(err => {
        return res.status(400).json({success:false, error:err})
    })
});

// delete all cart items of a user
router.delete('/', async (req, res) => {
    try {
      // Verify the JWT and get the user ID
      const token = req.headers.authorization.split(' ')[1]; // Assuming the JWT is in the Authorization header
      const secret = process.env.secret;
      const decodedToken = jwt.verify(token, secret); // Replace 'YOUR_SECRET_KEY' with your actual secret key
      const userId = decodedToken.userId;
  
      await CartItem.deleteMany({ user: userId });
      res.json({ success: true, message: 'Cart items deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });



  module.exports = router;