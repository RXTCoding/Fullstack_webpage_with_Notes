// Our App.js is set up to do a couple things, primarily it
// renders our Header and our routes but in addition to that our
// App.js is hitting the getUser endpoint to see if our user is logged
// in in the case of a page reload.
import {useEffect} from 'react'
import './App.css';
import routes from './routes'
import Header from './components/Header'
// We need to bring in the useDispatch hook and the setUser and setCart
// actions so that when we fetch our user data from the server we can save
// them into redux. Using the useDispatch hook allows us to bypass using
// connect down at the bottom of the page.
import {useDispatch} from 'react-redux'
import {setUser} from './redux/authReducer'
import {setCart} from './redux/cartReducer'
import axios from 'axios'

function App() {
  // to use the dispatch hook we set a variable equal to useDispatch invoked
  // and then we can invoke that variable and pass it an action in order to
  // make that action happen in redux.
  const dispatch = useDispatch()
  useEffect(() => {
    axios.get('/auth/me').then(res => {
      dispatch(setUser(res.data.user))
      dispatch(setCart(res.data.cart))
    }).catch((err) => {
      console.log(err.response)
    })
  }, [])
  return (
    <div className="App">
      {/* Here we just render the Header as well as our routes. */}
      <Header />
      {routes}
    </div>
  );
}

export default App
// Go look at the ./routes page next to see what routes we have in the application.
