import {useState, useEffect} from 'react'
import axios from 'axios'
// import {connect} from 'react-redux'
// Note we're bringing in both useSelector AND useDispatch here. useSelector
// is for accessing our redux state and useDispatch is for accessing our redux
// actions. We also need to import the actions (action builders) that we want
// so we brought in setCart here.
import {useSelector, useDispatch} from 'react-redux'
import {setCart} from '../redux/cartReducer'

const Products = (props) => {
  // here we've made the choice of saving our products array here on local
  // state instead of redux.
  const [products, setProducts] = useState([])
  // notice how I am calling the useSelector hook and giving it a callback
  // function defining the pieces of state from our store we want to have
  // access to. in the first case I'm returning the whole authReducer state
  // and then destructuring just the user off of that object and in the second
  // case I am returning the whole cartReducer state and then destructuring
  // just the cart off of that state.
  const {user} = useSelector((store) => store.auth)
  const {cart} = useSelector((store) => store.cartReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    // when the page loads we do an axios call to get all of our products
    // and then save them to local state.
    axios.get('/api/products')
    .then((res) => {
      setProducts(res.data)
    })
    .catch(err => console.log(err))
  }, [])

  const handleAddToCart = (product_id) => {
    // When we click the Add To Cart button it will look in redux to see
    // if the item we clicked is already in our cart. If it is we don't want to
    // hit the add endpoint again because we don't want to add the product into
    // our cart a second time.
    const product = cart.find((product) => product.product_id === product_id)
    console.log(product)
    // if we didn't find a product that means it's not already in our cart and we
    // can hit the add endpoint.
    if(!product){
      axios.post(`/api/cart/${product_id}`)
      .then((res) => {
        // after hitting the add endpoint we will get the updated cart info and save
        // it into redux.
        dispatch(setCart(res.data))
      })
      .catch((err) => {
        // If we get a 511 error then that means we somehow clicked the button when we
        // were not logged in and we should be redirected to the auth page.
        console.log(err)
        if(err.response.status === 511){
          props.history.push('/auth')
        }
      })
    }else{
      // We will hit this else if we found that the product that was clicked on was
      // already inside of our cart. If this is the case we instead want to update the
      // quantity of that item in our cart by +1.
      axios.put(`/api/cart/${product_id}`, {quantity: product.quantity + 1})
      .then((res) => {
        // after we're done with this endpoint it will send us back the cart information
        // which we will then save into redux using dispatch(setCart(res.data))
        dispatch(setCart(res.data))
      })
      .catch(err => {
        
        console.log(err)
        // once again if we get a 511 error it means we need to be logged in so we will
        // be redirected to the auth page.
        if(err.response.status === 511){
          props.history.push('/auth')
        }
      })
    }
  }
  return(
    <div>
      <h1>Products Page</h1>
      {/* Here we map over the products that we have saved on state and
      display the anem and description of those products. We also have a button
      to call the handleAddToCart function and pass it the product_id of the
      product we clicked on. */}
      {products.map((product) => {
        return (
          <div key={product.product_id}>
            <h4>{product.product_name}</h4>
            <p>{product.product_description}</p>
            {user && <button onClick={() => handleAddToCart(product.product_id)}>Add To Cart</button>}
          </div>
        )
      })}
    </div>
  )
}

// Notice how we did not need to use connnect since we used useSelector
// and useDispatch!
export default Products
// const mapStateToProps = (store) => store.auth
// export default connect(mapStateToProps)(Products)