// I've set up a skeleton index.js here with all the basic
// info I would include in my index.js. We have not brought
// in any controllers yet or set up any endpoints. Everything
// else you'll notice is very similar to previous warmups and
// lectures.

// IMPORTS
require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')

const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env

// CONTROLLERS
// Here we import our controllers for authentication/products/and a user's
// cart. Each of these controllers will handle the actions for the endpoints
// we use for each data type.
const authCtrl = require('./controllers/authController')
const productCtrl = require('./controllers/productController')
const cartCtrl = require('./controllers/cartController')


// APP INSTANCE CREATED
const app = express()

// TOP LEVEL MIDDLEWARE
// Here we set up our server to translate json and create a session when someone
// hits an endpoint. If someone has already hit an endpoint we will use their
// existing session.
app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 1000 *60 *60 *24}
}))

// DATABASE CONNECTION
// Here we set up our database connection and save the connection to our app
// so that we can use it in our controllers.
massive({
  connectionString: CONNECTION_STRING,
  ssl: {rejectUnauthorized: false}
})
.then(db =>{
  app.set('db', db)
  console.log("Database Connected")
  app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`))
}).catch(err => console.log(err))


// ENDPOINTS
// AUTH
// Auth Endpoints for registering/logging in/logging out and checking to see if
// I still currently have an active session saved on the server and to retrieve
// my relevant information if so. Take a look through the Auth Controller to 
// see how these endpoints behave and then come back to this page and continue
// reading through the rest of the endpoint logic. Auth Controller is at
// ./controllers/authController.js
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)
app.get('/auth/me', authCtrl.getUser)

// PRODUCTS
// For now we can only "get" Products, but down the road it would probably make sense
// for me to add an "admin portal" that would allow someone to log in as an admin
// and add/delete/edit products on the site. Take a look at ./controllers/productController
// to get a feel for what this endpoint will do.
app.get('/api/products', productCtrl.getProducts)

// CART
// Here we have the endpoints for retrieving a user's cart, adding to it, deleting from it
// and editing the quantity of items in the cart. For adding/editing/deleting we will expect
// a user to pass back a product_id so we know what product in the product table should be
// placed in the cart. When you go to look at the controller for cart note that we get the product_id
// off of req.params and we get our cart_id off of req.session.user. The reason we can get the
// cart_id here is we set our register/login to get our cart_id out of the database and save
// it to our user on session. Go look at ./controllers/cartController to see what our cart will
// be doing.
app.get('/api/cart', cartCtrl.getCart)
app.post('/api/cart/:product_id', cartCtrl.addToCart)
app.delete('/api/cart/:product_id', cartCtrl.deleteItemFromCart)
app.put('/api/cart/:product_id', cartCtrl.changeCartQty)