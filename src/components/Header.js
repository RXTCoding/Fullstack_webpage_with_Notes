// Here in the Header we've brought in Link from react-router-dom
// so that we can link to the various pages of our application.
// Before we look at any given route let's go look at how we structured
// redux. To start let's look at ../redux/authReducer
import {Link} from 'react-router-dom'

const Header = () => {
  return(
    <header>
      <Link to='/'>Dashboard</Link>
      <Link to='/auth'>Auth</Link>
      <Link to='/products'>Products</Link>
      <Link to='/cart'>Cart</Link>
    </header>
  )
}

export default Header