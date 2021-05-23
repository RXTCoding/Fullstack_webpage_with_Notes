// IMPORT SWITCH AND ROUTE FROM REACT ROUTER DOM
// SET UP ROUTES FOR OUR COMPONENTS
import {Switch, Route} from 'react-router-dom'
import Auth from './components/Auth'
import Cart from './components/Cart'
import Dash from './components/Dash'
import Products from './components/Products'

// Here we've brought in 4 components to make 4 different routes for our
// app. the main page will be the Dash component which currently doesn't do
// anything special but in addition to that route we have the auth route
// where registering and logging in will happen as well as the products and
// cart routes for displaying product information and the cart respectively.

export default (
  <Switch>
    <Route exact path='/' component={Dash} />
    <Route path='/auth' component={Auth} />
    <Route path='/cart' component={Cart} />
    <Route path="/products" component={Products} />
  </Switch>
)
// Let's go look at ./components/Header.js to see how we would use links to move
// around our app.
// Remember! In order for react-router-dom to work you will need to bring a Router
// into your ./index.js and wrap it around your App but we'll be looking into that
// in just a bit.