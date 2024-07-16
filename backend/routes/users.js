const User = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs') //for hashing passwords
const jwt = require('jsonwebtoken')

router.get('/',async(req, res) => {

    const userList = await User.find();

    if(!userList){
        res.status(500).json({success:false})
    }
    res.send(userList);
})

//Get user account details
router.get('/account', async (req,res) => {
      // Verify the JWT and get the user ID
      const token = req.headers.authorization.split(' ')[1]; // Assuming the JWT is in the Authorization header
      const secret = process.env.secret;
      const decodedToken = jwt.verify(token, secret); // Replace 'YOUR_SECRET_KEY' with your actual secret key
      const userId = decodedToken.userId;

    const user = await User.findById(userId).select('-passwordHash');
    if(!user)
    return res.status(500).json({success:false})

    return res.send(user)
});

router.put('/', async(req,res) => {

    // Verify the JWT and get the user ID
    const token = req.headers.authorization.split(' ')[1]; // Assuming the JWT is in the Authorization header
    const secret = process.env.secret;
    const decodedToken = jwt.verify(token, secret); // Replace 'YOUR_SECRET_KEY' with your actual secret key
    const userId = decodedToken.userId;

    const user = await User.findById(userId);

    const updateUser = await User.findByIdAndUpdate(userId,
        {
            name : req.body.name || user.name,
            email : req.body.email || user.email,
            passwordHash : req.body.password != null ? bcrypt.hashSync(req.body.password, 10) || user.passwordHash : user.passwordHash,
            phone : req.body.phone || user.phone,
            postcode : req.body.postcode || user.postcode,
            street : req.body.street || user.street,
            apartment : req.body.apartment || user.apartment,
            city : req.body.city || user.city
            },{ new:true }
        )

        if(!updateUser) return res.status(500).send('User can not be updated')

        return res.status(200).json(updateUser)
});



//Get user by id without passwords
router.get('/:id', async (req,res) => {
    const user = await User.findById(req.params.id).select('-passwordHash');

    if(!user)
    return res.status(500).json({success:false})

    return res.send(user)
});

//delete the data of user
router.delete('/:id', (req,res) => {
     User.findByIdAndDelete(req.params.id).then((deluser) => {

         if(!deluser){
            return res.status(404).json({success:false, message:'User not found'})
        }else{
           return res.status(200).json({success:true, message:'User deleted'})
        }

     }).catch((e) => {
        console.log(e)
        return res.status(500).json({success:true, error:e, message:'user not found'})
     })
    })
    


// to insert the data
router.post('/register',async (req, res)=>{
    
    
    const record = await User.findOne({'email': req.body.email})
    if(record){
        return res.status(400).send({
            message:'Email already exists'
        })
    }
    else
    {   
        let user = new User({
            name : req.body.name,
            email : req.body.email,
            passwordHash : bcrypt.hashSync(req.body.password, 10),
            phone : req.body.phone,
            isAdmin : req.body.isAdmin,
            postcode : req.body.postcode,
            street : req.body.street,
            apartment : req.body.apartment,
            city : req.body.city
        })
    
        u = await user.save();
        if(!u){
            return res.status(400).send('User cannot be created!')
        } 
        return res.send(u)

    }

});


//for login
router.post('/login', async (req, res) => {

    if(req.body.email == null){
        return res.status(400).send('Please enter email')
    }
    
    if(req.body.password == null || req.body.email == null){
        return res.status(400).send('Please enter password')
    }
   
    const user = await User.findOne({ email: req.body.email });
    const secret = process.env.secret;
    if (!user) {
        return res.status(400).send('User not found');
    }
    if (user.passwordHash && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            },
            secret,
            {
                expiresIn: '1d'
            }
        );
        res.status(200).send({ user: user.email, token: token, isAdmin: user.isAdmin });
    } else {
        res.status(400).send('Password is incorrect');
    }
    
});

//update users

router.put('/:id', async(req,res) => {

    const updateUser = await User.findByIdAndUpdate(req.params.id,
        {
        name : req.body.name,
        email : req.body.email,
        passwordHash : bcrypt.hashSync(req.body.password, 10),
        phone : req.body.phone,
        isAdmin : req.body.isAdmin,
        postcode : req.body.postcode,
        street : req.body.street,
        apartment : req.body.apartment,
        city : req.body.city
        },{ new:true }
        )

        if(!updateUser) return res.status(500).send('User can not be updated')

        return res.status(200).json({success:true, message:'User Updated'})
});

//delete the user

router.delete('/:id', (req,res) => {
    User.findByIdAndRemove(req.params.id).then(user => {
        if(user){
            return res.status(200).json({success:true, message:'User deleted'})
        }else{
            return res.status(404).json({success:false, message:'User not found'})
        }
    }).catch((e) => {
        console.log(e)
        return res.status(500).json({success:true, error:e, message:'user not found'})
    })
})

//count users
router.get('/get/count', async (req, res) => {
    const usercount = await User.countDocuments((count) => count)

    if(!usercount){
        res.status(500).json({success:false})
    }
    res.send({
        usercount:usercount
    });
});

//logout
router.post('/logout', async (req, res) => {
    res.status(200).send({ token: null , message:'User logged out'});
});

module.exports = router;