// Our cartController is by far the controller with the most going on
// and a lot of it is different than what we've seen before so we will
// go line by line through this file.

module.exports = {
  getCart: (req, res) => {
    // We get our database connection and make sure we have a user on 
    // our session. We talked about this in class but checking that the
    // user is logged in would be an excellent thing to move into some
    // request level middleware since we're doing it in so many different
    // endpoints.
    const db = req.app.get('db')
    const {user} = req.session
    // here we check to make sure the user is logged in and if they are not
    // we send back a 511 error. This is important because now on the frontend
    // we can check to see if an axios call sends back a 511 error and if it does
    // we can redirect the user to the login page.
    if(!user){
      return res.status(511).send('User not logged in.')
    }
    // If the user is logged in we will take their cart_id we saved on session
    // when they logged in and get their cart information back so we can send
    // it to the user on the frontend. Feel free to check out ../../db/cart/get_cart_items
    // to see what this query looks like.
    db.cart.get_cart_items(user.cart_id).then(cart => {
      res.status(200).send(cart)
    }).catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
  },
  addToCart: (req, res) => {
    // Here we again check to see if the user is logged in and we
    // also grab our product_id off of our params in the url. We need to
    // know the product_id so we know what product the user is trying
    // to add to their cart.
    const db = req.app.get('db')
    const {user} = req.session
    const {product_id} = req.params
    if(!user){
      return res.status(511).send("User not logged in.")
    }
    // check out the ../../db/cart/add_to_cart sql file to see how we use
    // the cart_id and the product_id to "add an item to our cart" using
    // the junction table. Notice how here we also had that query return
    // the cart information just like the get_cart_items query did. This is
    // because we need to update the cart in redux on the frontend after a user
    // adds an item to their cart.
    db.cart.add_to_cart(user.cart_id, product_id)
    .then((cart) => {
      res.status(200).send(cart)
    }).catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
  },
  deleteItemFromCart: (req, res) => {
    // This has the same setup, we check that the user is logged in and
    // get the product_id of the item we want to delete out of our cart.
    const db = req.app.get('db')
    const {user} = req.session
    const {product_id} = req.params
    if(!user){
      return res.status(511).send('User not logged in.')
    }
    // check out ../../db/cart/delete_item_from_cart to see how we go about
    // deleting an item out of a user's cart using the cart_id and the product_id.
    db.cart.delete_item_from_cart(user.cart_id, product_id)
    .then((cart) => {
      // all of our cart endpoints we have structured to send back the cart items
      res.status(200).send(cart)
    }).catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
  },
  changeCartQty: (req, res) => {
    // Our edit endpoint also needs to know the cart_id and product_id we are updating
    // but it also needs to know what we want to change the quantity in that cart to be.
    // We will have the user pass this back on req.body
    const db = req.app.get('db')
    const {user} = req.session
    const {product_id} = req.params
    const {quantity} = req.body
    if(!user){
      return res.status(511).send("User not logged in.")
    }
    // Check out the ../../db/cart/change_cart_qty query to see how we edit the quantity
    // of an item for a given cart.
    db.cart.change_cart_qty(user.cart_id, product_id, quantity)
    .then((cartProducts) => {
      res.status(200).send(cartProducts)
    }).catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
  }
}
// When you're done with this controller and have reviewed the relevent sql queries
// go ahead and jump to ../../src/App.js and we'll start going through the frontend logic.