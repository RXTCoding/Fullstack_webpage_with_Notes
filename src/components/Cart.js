import {useEffect} from 'react'
import axios from 'axios'
// import {connect} from 'react-redux'
// Here we again bring in both useSelector and useDispatch so that
// we can replace connect for connecting to redux and using our
// action builders.
import {useSelector, useDispatch} from 'react-redux'
import {setCart} from '../redux/cartReducer'

const Cart = (props) => {
  // here we get our cart from our redux state and we get dispatch so
  // that we can use our setCart action builder.
  const {cart} = useSelector((store) => store.cartReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    // when the page loads we go and get our cart information from the server
    // and save it into redux using dispatch(setCart(res.data))
    axios.get('/api/cart')
    .then((res) => {
      console.log(res.data)
      dispatch(setCart(res.data))
      // props.setCart(res.data)
    }).catch(err => {
      // if there is a 511 error when the page loads then that means we are not logged
      // in and we shouldn't be on the cart page, it will push us to login.
      console.log(err)
      if(err.response.status === 511){
        props.history.push('/auth')
      }
    })
  }, [dispatch])

  const handleDeleteFromCart = (product_id) => {
    // when we delete an item from the cart we will pass in the product_id we want
    // to delete which we will then place on the end of the url so the server knows what
    // item to delete out of our cart. Afterwards it will send us back the updated cart
    // which we will save into redux.
    axios.delete(`/api/cart/${product_id}`)
    .then((res) => {
      dispatch(setCart(res.data))
    })
    .catch(err => {
      console.log(err)
      // we go to the auth page if we are not logged in when we click this button.
      if(err.response.status === 511){
        props.history.push('/auth')
      }
    })
  }

  const handleChangeQty = (product_id, quantity) => {
    // Our handleChangeQty will take in a product_id and a quantity and if the quantity
    // is 0 we will simply call the handleDeleteFromCart up above instead of something
    // else, but if it's greater than 0 we will call the edit endpoint which will
    // make a request to the server to edit the quantity of that item in our cart and
    // then return the updated cart so we can save it to redux.
    if(quantity <= 0){
      handleDeleteFromCart(product_id)
    }else{
      axios.put(`/api/cart/${product_id}`, {quantity})
      .then(res => {
        // dispatch(setCart(res.data)) will save our cart info from the server into the database
        dispatch(setCart(res.data))
      })
      .catch(err => {
        // same error handling of other times we receive a 511 error.
        console.log(err)
        if(err.response.status === 511){
          props.history.push('/auth')
        }
      })
    }
  }

  return(
    <div>
      <h1>Cart Page</h1>
      {/* Here we map over our cart and display each item in the cart as well
      as a button to delete the item from the cart, reduce the quantity of that item
      in our cart, or increase the quantity of that item in our cart (the functions
      up above) */}
      {cart.map((product) => {
        return(
          <div key={product.product_cart_id}>
            <h4>{product.product_name}</h4>
            <h5>Qty: {product.quantity}</h5>
            <button onClick={() => handleDeleteFromCart(product.product_id)}>X</button>
            {/* to change the quantity we take the current quantity of that item and add one or
            subtract one and pass that new value into handleChangeQty. */}
            <button onClick={() => handleChangeQty(product.product_id, product.quantity - 1)}>-</button>
            <button onClick={() => handleChangeQty(product.product_id, product.quantity + 1)}>+</button>
          </div>
        )
      })}
    </div>
  )
}

// no need to use connect. And we're done! Feel free to go back and review any
// of the previous files we've covered.
export default Cart
// const mapStateToProps = (store) => store.cartReducer
// export default connect(mapStateToProps, {setCart})(Cart)