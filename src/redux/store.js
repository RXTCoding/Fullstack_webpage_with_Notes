// Here we bring in createStore and combineReducers from redux
// so we can set up our store. We also import both of our reducers.
// If we had more reducers we'd import them all here.
import {createStore, combineReducers} from 'redux'
import authReducer from './authReducer'
import cartReducer from './cartReducer'

// SOMETHING TO NOTE for example purposes I named my authReducer
// auth here and I named my cartReducer cartReducer. You can change
// the name of your reducer if you want. It will just mean when you
// go to access the redux state you'll need to remember what you
// changed it to.
const rootReducer = combineReducers({
  auth: authReducer,
  cartReducer
})

export default createStore(rootReducer)
// Next go take a quick look at ../index.js to see how we did the final
// setup step for both redux and react-router-dom.