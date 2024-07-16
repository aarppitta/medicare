const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Category = require('../models/category');
const multer = require('multer');
const { default: mongoose } = require('mongoose');

const FILE_TYPE_MAP = {
    'image/png':'png',
    'image/jpeg':'jpeg',
    'image/jpg':'jpg'
}


//upload image
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');
        if(isValid){
            uploadError = null
        }
        cb(uploadError,'public/uploads/')
    },
    filename: function(req,file,cb){
        const extension = FILE_TYPE_MAP[file.mimetype];
        const filename = file.originalname.split(' ').join('-');
        cb(null,`${filename}-${Date.now()}.${extension}` )
    }
})
const uploadOptions = multer({storage:storage});

//get all records
router.get(`/`, async(req,res) =>{
    const productList = await Product.find();

    if(!productList) {
        res.status(500).json({success:false})
    }
    res.send(productList)
});

//get record by id
router.get('/:id', async(req,res) => {
    const productId = await Product.findById(req.params.id).populate('category');

    if(!productId) 
    return res.status(400).send('cannot find ID')

    return res.send(productId)
})

//add record
router.post(`/`,uploadOptions.single('image'), async (req,res) =>{
    
    //const category = await Category.findById(req.body.category);
    const category = await Category.findById('65e76d18850e7a946459b0c2');
    if(!category)
        return res.status(400).send('Invalid Category');

    const file = req.file;
    if(!file)
        return res.status(400).send('No image in the request');

        
    
    const fileName = req.file.filename;
    const basePath =`${req.protocol}://${req.get('host')}/public/uploads/`;
    console.log(basePath)
    const product  = new Product({
        pname:req.body.pname,
        description:req.body.description,
        richDescription:req.body.richDescription,
        image:`${basePath}${fileName}`,
        price:req.body.price,
        category:category,
        countInStock:req.body.countInStock,
        isFeatured:req.body.isFeatured,
        dateCreated:req.body.dateCreated,
    })
    prod = await product.save();
    
    if(!prod){
        return res.status(500).send('Product cannot be created');
    }

    return res.status(201).json(prod);
});


//update the record
router.put('/:id', uploadOptions.single('image') , async(req,res) => {

    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).send('Invalid Product ID')
    }
    // const category = await Category.findById(req.body.category);
    // if(!category)
    //     return res.status(400).send('Invalid Category');
    
    let updateProduct = await Product.findById(req.params.id);
    
    if(!updateProduct)
    return res.status(400).send('Invalid Product ID')

    const file = req.file;
    let imagePath;
    if(file){
        const fileName = req.file.filename;
        const basePath =`${req.protocol}://${req.get('host')}/public/uploads/`;
        imagePath =`${basePath}${fileName}`;
    }else{
        imagePath = updateProduct.image;
    }
    updateProduct = {
        pname:req.body.pname || updateProduct.pname,
        description:req.body.description || updateProduct.description,
        richDescription:req.body.richDescription || updateProduct.richDescription,
        image: imagePath,
        price:req.body.price || updateProduct.price,
        category:req.body.category || updateProduct.category,
        countInStock:req.body.countInStock || updateProduct.countInStock,
        isFeatured:req.body.isFeatured || updateProduct.isFeatured,
        dateCreated:req.body.dateCreated || updateProduct.dateCreated,
    };

    updateProduct = await Product.updateOne(updateProduct)
    if(!updateProduct)
    return res.status(500).send('product cannot be updated')
        
    return res.send(updateProduct)
});



//delete the record
router.delete('/:id', (req,res) => {
    Product.findByIdAndDelete(req.params.id).then(product => {
        if(product){
            return res.status(200).json({success:true, message:'product deleted'})
        }else{
            return res.status(404).json({success:false, message:'product not found'})
        }
    }).catch(err => {
        return res.status(400).json({success:false, error:err})
    })
});

//if product is featured

router.get('/get/featured/:count', async (req,res) => {
    const count = req.params.count ? req.params.count : 0;
    const products = await Product.find({isFeatured:true}).limit(+count);

    if(!products){
        res.status(500).json({success:false})
    }
    res.send(products)
});

//count
router.get(`/get/count`, async (req, res) => {
    try {
        const productCount = await Product.countDocuments();
        res.send({
            productCount: productCount
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
//add multiple images
router.put('/gallery-images/:id', uploadOptions.array('images', 10), async(req, res) => {

    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).send('Invalid Product ID')
    }
    const files = req.files;
    let imagesPaths = [];
    const basePath =`${req.protocol}://${req.get('host')}/public/uploads/`;

    if(files){
        files.map(file => {
            imagesPaths.push(`${basePath}${file.filename}`);
        })
    }
    const updateProduct = await Product.findByIdAndUpdate(req.params.id,
        {
        images:imagesPaths
        },
        { new:true }
        )

        if(!updateProduct)
        return res.status(500).send('product cannot be updated')
        
        return res.send(updateProduct)

})


module.exports = router
