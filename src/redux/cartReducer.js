// Scroll through this page and notice how similar to the authReducer
// it is. The only real difference is the datatype. As you can see
// setting up redux is mostly formulaic and doesn't have to be super
// complicated, all you have to do is work through the boilerplate
// to set up.
// Look through the page and compare it to the authReducer to make sure
// you're comfortable with this pattern and then check out ./store.js

// initial state
const initialState = {
  cart: []
}
// action types
const SET_CART = "SET_CART"
// action builders
export function setCart(cart){
  return {
    type: SET_CART,
    payload: cart
  }
}
// reducer
export default function cartReducer(state = initialState, action){
  switch(action.type){
    case SET_CART:
      return {...state, cart: action.payload}
    default:
      return {...state}
  }
}