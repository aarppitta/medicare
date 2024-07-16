const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Order = require('../models/order');
const OrderItem = require('../models/order-item')
const jwt = require('jsonwebtoken');
const CartItem = require('../models/cart-item');
const nodemailer = require('nodemailer');

router.get('/', async (req,res) => {
    const orderList = await Order.find()
        .populate('user','name email')// Populate the user field with name and email
        .populate({
            path: 'orderItems',
            populate: {
                path: 'product',
                model: 'Product'
            }
        })
        .sort({ 'dateOrdered': -1 });

    console.log(orderList);
    if(!orderList){
        res.status(500).json({success:false})
    }
    else{
        res.send(orderList)
    }
});




router.get('/:id', async (req,res) => {
    const order = await Order.findById(req.params.id)
    .populate({path:'orderItems', populate:{
        path:'product', populate:'category'
    
    }}).sort({'dateOrdered':-1});

    if(!order){
        res.status(500).json({success:false})
    }
    else{
        res.send(order)
    }
});


//add order
router.post(`/`, async (req,res) =>{

    const orderItemsPromises = req.body.orderItems.map(async orderItem =>{
        let newOrderItem = new OrderItem({
            quantity : orderItem.quantity,
            product : orderItem.product,
        })
        const newOrder = await newOrderItem.save();
        return newOrder._id
        
    })

    const orderItemsIds = await Promise.all(orderItemsPromises);
    const totalPrices = await Promise.all(orderItemsIds.map(async (orderItemId) => {
        const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');   
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice;
    }))

    const totalPrice = totalPrices.reduce((a,b) => a + b, 0);
    const order  = new Order({
    
        orderItems: orderItemsIds,
        shippingAddress: req.body.shippingAddress,
        city: req.body.city,
        postcode: req.body.postcode,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user,
    })

    orderResult = await order.save();
    
    if(!orderResult)
     return res.status(500).send('Order Can not be created!');

     return res.status(200).json({message:'Order Created', orderResult})
});




//update order

router.put('/:id', async (req,res) => {
    const order = await Order.findByIdAndUpdate(req.params.id,
        {
        status:req.body.status
        },
    {
        new:true
    })

    if(!order)
    return res.status(404).send('Order can not be updated!')

    res.send(order)
});

//delete order
router.delete('/:id', (req,res) => {
    Order.findOneAndDelete(req.params.id).then(async order =>{
        if(order){
            await order.orderItems.map(async orderItem =>{
                await OrderItem.findByIdAndRemove(orderItem)
            })
            return res.status(200).json({success:true, message:'Order deleted!'})   
        }else{
            return res.status(404).json({success:false, message:'Order not found'})
        }
}).catch(err=>{
    return res.status(500).json({success:false, error:err})
})
});


//totalsales
router.get('/get/totalsales', async (req,res) => {
    const totalsales = await Order.aggregate([
        {$group: {_id:null, totalsales:{$sum:'$totalPrice'}}}
    ])
    if(!totalsales){
        return res.status(400).send('The order sales can not be generated')
    }
    return res.send({totalsales:totalsales.pop().totalsales})
});

//order count
router.get(`/get/count`, async (req, res) => {
    try {
        const orderCount = await Order.countDocuments();
        res.send({
            orderCount: orderCount
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


//get user orders
router.get(`/get/userorders/:userid`, async (req, res) => {
    const userOrderList = await Order.find({user:req.params.userid}).populate({
        path:'orderItems', populate:
        {
            path:'product', populate:'category'
        }
    })
    if(!userOrderList){
        res.status(500).json({success:false})
    }
    res.send(userOrderList);
});

module.exports = router;