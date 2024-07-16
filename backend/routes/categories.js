const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const { route } = require('./products');

//fetch the data from database

router.get('/', async (req,res) => {
    const categoryList = await Category.find();

    if(!categoryList){
        res.status(500).json({success:false})
    }
    res.send(categoryList);
});

//get the record by id

router.get('/:id', async(req,res) => {
    const catId = await Category.findById(req.params.id);

    if(!catId){
        return res.status(404).json({success:false, message:"Id not found"})
    }else{
        return res.status(200).send(catId)
    }
})

// adding the record in database

router.post('/', async(req,res) => {
    const category = new Category({
        cname:req.body.cname,
        image:req.body.image,
    })
    cat = await category.save();

    if(!cat)
    return res.status(404).send('category cannot be created')

    res.send(cat);
});


//url will be - http://localhost:3000/api/v1/categories/id
// delete the record

router.delete('/:id', (req,res) => {
    Category.findOneAndDelete(req.params.id).then(category => {
        if(category){
            return res.status(200).json({success:true, message:'category deleted!'})
        }else{
            return res.status(404).json({success:false, message:'category not found'})
        }
    }).catch((err) => {
        return res.status(400).json({success:false, error:err})
    })
});

//update the record
router.put('/:id', async(req,res) => {
    const catUpdate = await Category.findByIdAndUpdate(
        req.params.id,
        {
            cname: req.body.cname,
            image: req.body.image
        },
        {new:true}
        )
        if(!catUpdate)
        return res.status(400).send('category cannot be found')
        
        res.send(catUpdate)
})      



module.exports = router;