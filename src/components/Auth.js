import {useState} from 'react'
import axios from 'axios'
// Here we brought in the action builder for saving our user
// to redux as well as saving our cart to redux.
import {setUser} from '../redux/authReducer'
import {setCart} from '../redux/cartReducer'
// import {connect} from 'react-redux'
// here we brought in the useDispatch hook so that we can actually
// utilize the setUser and setCart action builders. The other option
// would be to use connect down at the bottom.
import {useDispatch} from 'react-redux'

const Auth = (props) => {
  // Here we have 2 pieces of state for email and password for when a user
  // wants to log in or register on this page. They're attached to input
  // fields down in the jsx.
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // here we bring in the dispatch function using useDispatch. Now we can
  // execute a specific action by invoking dispatch and passing it the action
  // builder with the right parameters. See an example of that in the handleRegister
  // axios call.
  const dispatch = useDispatch()
  const handleRegister = () => {
    // Here we hit the /auth/register endpoint passing in email and password on req.body
    axios.post('/auth/register', {email, password})
    .then((res) => {
      // Once the register endpoint is done it sends us back the user object as res.data
      // so we can take that and call dispatch(setUser(res.data)) to pass the user object
      // into redux to be saved.
      dispatch(setUser(res.data))
      // After I register/log in we decided to go get the cart for this user so that 
      // we can save it to redux so we have the cart information saved in redux without needing
      // to visit the cart page.
      axios.get('/api/cart').then((response) =>{
        // when the "get cart" axios call returns it sends us the cart info on response.data so we
        // take that and save it into redux using dispatch(setCart(response.data))
        dispatch(setCart(response.data))
        // after we finish with registering and getting our cart info we use history.push to go
        // to the products page.
        props.history.push('/products')
      })
    })
    .catch(err => console.log(err))
  }
  const handleLogin = () => {
    // Notice how login is very similar to register. we pass it an email and password
    // and when the axios call sends us back the user info on res.data we save it
    // into redux using dispatch(setUser(res.data)) and then we go get the cart
    // info and save that into redux as well. 
    axios.post('/auth/login', {email, password})
    .then((res) => {
      console.log(res.data)
      dispatch(setUser(res.data))
      axios.get('/api/cart').then((response) => {
        dispatch(setCart(response.data))
        props.history.push('/products')
      })
    })
    .catch(err => console.log(err))
  }
  return(
    <div>
      <h1>Auth Page</h1>
      {/* Here are the input fields for email and password as well has buttons
      for register and login. */}
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  )
}

// Notice how if we use the useDispatch/useSelector hooks we don't need to use
// connect. Let's go look at ./Products next to see how we access our product info
// and display it.
export default Auth
// export default connect(null, {setUser})(Auth)