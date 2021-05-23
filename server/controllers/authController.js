// The notes on this file will be a bit light because we've
// set up our authController pretty similar to most other authControllers
// we've done but there is 1 main difference. After we register a user
// we create a cart for that user and attach the cart_id to our user on
// the session. Additionally when a user logs in we grab their existing
// cart out of the database so we can put their cart_id on the session after
// logging in.
// The files we're using that we haven't used before are ../../db/cart/create_cart
// and ../../db/cart/get_cart if you would like to see those queries.

const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req, res) => {
    const db = req.app.get('db')
    const {email, password} = req.body
    const [result] = await db.auth.check_email(email)
    if(result){
      return res.status(409).send('Email Taken.')
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const [user] = await db.auth.register_user(email, hash)
    const [cart] = await db.cart.create_cart(user.user_id)
    delete user.password
    req.session.user = user
    req.session.user.cart_id = cart.cart_id
    return res.status(200).send(req.session.user)
  },
  login: async (req, res) => {
    const db = req.app.get('db')
    const {email, password} = req.body
    const [user] = await db.auth.check_email(email)
    if(!user){
      return res.status(401).send("User Not Found.")
    }
    const isAuthenticated = bcrypt.compareSync(password, user.password)
    if(!isAuthenticated){
      return res.status(401).send('Password Incorrect.')
    }
    const [cart] = await db.cart.get_cart(user.user_id)
    delete user.password
    req.session.user = user
    req.session.user.cart_id = cart.cart_id
    return res.status(200).send(req.session.user)
  },
  logout: (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  },
  getUser: (req, res) => {
    const db = req.app.get('db')
    const {user} = req.session
    if(!user){
      return res.status(511).send("User not logged in.")
    }
    db.cart.get_cart_items(user.cart_id).then((cart) => {
      res.status(200).send({user, cart})
    })
  }
}