const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan') // to log all the requested api
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
const cookieParser = require('cookie-parser')

require('dotenv').config(); // Load environment variables from .env file
const api = process.env.API_URL || 'http://localhost:3000'; // Set a default value if API_URL is undefined



if (process.env.NODE_ENV === 'development') {
    console.log('API URL:', api); // Print the API URL in debug mode
}

app.use(cors({
    credentials: true,
    origin: 'http://localhost:4200',
}));

//middleware methods
app.use(express.json()); //my backend will understand whatever the frontend sends
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads/', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);



app.use(cookieParser());

//Routes
const productsRouter = require('./routes/products') // for router
const catRouter = require('./routes/categories')
const users = require('./routes/users');
const orders = require('./routes/orders');
const cart_Items = require('./routes/cart-Item');
const contactRouter = require('./routes/contacts');

//routers
app.use(`${api}/products`,productsRouter);
app.use(`${api}/categories`,catRouter);
app.use(`${api}/users`, users);
app.use(`${api}/orders`,orders);
app.use(`${api}/cart`,cart_Items);
app.use(`${api}/contacts`,contactRouter);




// databse connection
mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('Database connection is ready..')
}).catch((e)=>{
    console.log(e)
})

//server
app.listen(3000, () => { 
        console.log(api)
        console.log('App is running on port http://localhost:3000')
    })






